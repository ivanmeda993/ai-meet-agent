import { TRPCError } from '@trpc/server';
import { and, count, desc, eq, getTableColumns, ilike, sql } from 'drizzle-orm';

import { db } from '@/db';
import { agents, meetings } from '@/db/schema';
import { generateAvatarUri } from '@/lib/avatar';
import { streamVideo } from '@/lib/stream-video';
import { createTRPCRouter, protectedProcedure } from '@/trpc/init';

import {
  getManyMeetingsSchema,
  getOneMeetingSchema,
  meetingsInsertSchema,
  meetingsUpdateSchema,
} from '../types/meeting-schema';

export const meetingsRouter = createTRPCRouter({
  generateToken: protectedProcedure.mutation(async ({ ctx }) => {
    await streamVideo.upsertUsers([
      {
        id: ctx.auth.user.id,
        name: ctx.auth.user.name,
        role: 'admin',
        image:
          ctx.auth.user.image ??
          generateAvatarUri({
            seed: ctx.auth.user.name,
            variant: 'initials',
          }),
      },
    ]);

    const expirationTime = Math.floor(Date.now() / 1000) + 3600;
    const issuedAt = Math.floor(Date.now() / 1000) - 60;

    const token = streamVideo.generateUserToken({
      user_id: ctx.auth.user.id,
      exp: expirationTime,
      validity_in_seconds: issuedAt,
    });

    return token;
  }),
  getOne: protectedProcedure
    .input(getOneMeetingSchema)
    .query(async ({ input, ctx }) => {
      const [existingMeeting] = await db
        .select({
          ...getTableColumns(meetings),
          agent: agents,
          duration: sql<number>`EXTRACT(EPOCH FROM (ended_at - started_at))`.as(
            'duration',
          ),
        })
        .from(meetings)
        .innerJoin(agents, eq(meetings.agentId, agents.id))
        .where(
          and(eq(meetings.id, input.id), eq(meetings.userId, ctx.auth.user.id)),
        );

      if (!existingMeeting) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Meeting not found',
        });
      }
      return existingMeeting;
    }),

  getMany: protectedProcedure
    .input(getManyMeetingsSchema)
    .query(async ({ ctx, input }) => {
      const { search, page, pageSize, status, agentId } = input;

      const baseWhere = eq(meetings.userId, ctx.auth.user.id);
      const whereCondition = and(
        baseWhere,
        search ? ilike(meetings.name, `%${search}%`) : undefined,
        status ? eq(meetings.status, status) : undefined,
        agentId ? eq(meetings.agentId, agentId) : undefined,
      );

      const result = await db
        .select({
          ...getTableColumns(meetings),
          agent: agents,
          duration: sql<number>`EXTRACT(EPOCH FROM (ended_at - started_at))`.as(
            'duration',
          ),
          totalSearchCount: sql<number>`count(*) over()`,
          totalCount: sql<number>`(
          select count(*)
          from ${meetings} m
          inner join ${agents} a on m.agent_id = a.id
          where ${baseWhere}
        )`,
        })
        .from(meetings)
        .innerJoin(agents, eq(meetings.agentId, agents.id))
        .where(whereCondition)
        .orderBy(desc(meetings.createdAt), desc(meetings.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      // Ako nema rezultata, vraćamo prazan odgovor
      if (result.length === 0) {
        const [totalCount] = await db
          .select({ count: count() })
          .from(meetings)
          .innerJoin(agents, eq(meetings.agentId, agents.id))
          .where(baseWhere);

        return {
          items: [],
          total: totalCount.count,
          totalPages: 0,
          totalSearchCount: 0,
        };
      }

      const totalSearchCount = result[0].totalSearchCount;
      const totalCount = result[0].totalCount;
      const totalPages = Math.ceil(totalSearchCount / pageSize);

      return {
        items: result.map(({ totalSearchCount, totalCount, ...item }) => item),
        total: totalCount,
        totalPages,
        totalSearchCount,
      };
    }),

  create: protectedProcedure
    .input(meetingsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdMeetings] = await db
        .insert(meetings)
        .values({ ...input, userId: ctx.auth.user.id })
        .returning();

      const call = streamVideo.video.call('default', createdMeetings.id);
      await call.create({
        data: {
          created_by_id: ctx.auth.user.id,
          custom: {
            meetingId: createdMeetings.id,
            meetingName: createdMeetings.name,
          },
          settings_override: {
            transcription: {
              language: 'en',
              mode: 'auto-on',
              closed_caption_mode: 'auto-on',
            },
            recording: {
              mode: 'auto-on',
              quality: '1080p',
            },
          },
        },
      });

      const [existingAgent] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, createdMeetings.agentId));

      if (!existingAgent) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Agent not found',
        });
      }

      await streamVideo.upsertUsers([
        {
          id: ctx.auth.user.id,
          name: ctx.auth.user.name,
          role: 'user',
          image: generateAvatarUri({
            seed: existingAgent.name,
            variant: 'botttsNeutral',
          }),
        },
      ]);
      return createdMeetings;
    }),
  update: protectedProcedure
    .input(meetingsUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const [updatedMeetings] = await db
        .update(meetings)
        .set(input)
        .where(
          and(eq(meetings.id, input.id), eq(meetings.userId, ctx.auth.user.id)),
        )
        .returning();

      if (!updatedMeetings) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Meeting not found',
        });
      }

      return updatedMeetings;
    }),

  remove: protectedProcedure
    .input(getOneMeetingSchema)
    .mutation(async ({ ctx, input }) => {
      const [removedMeeting] = await db
        .delete(meetings)
        .where(
          and(eq(meetings.id, input.id), eq(meetings.userId, ctx.auth.user.id)),
        )
        .returning();

      if (!removedMeeting) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Meeting not found',
        });
      }

      return removedMeeting;
    }),
});
