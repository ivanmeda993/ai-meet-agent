import { TRPCError } from '@trpc/server';
import { and, desc, eq, getTableColumns, ilike, sql } from 'drizzle-orm';

import { db } from '@/db';
import { agents, meetings } from '@/db/schema';
import { createTRPCRouter, protectedProcedure } from '@/trpc/init';

import {
  getManyMeetingsSchema,
  getOneMeetingSchema,
  meetingsInsertSchema,
} from '../types/meeting-schema';

export const meetingsRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(getOneMeetingSchema)
    .query(async ({ input, ctx }) => {
      const [existingMeeting] = await db
        .select({
          ...getTableColumns(meetings),
        })
        .from(meetings)
        .where(
          and(eq(meetings.id, input.id), eq(meetings.userId, ctx.auth.user.id)),
        );

      if (!existingMeeting) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Agent not found',
        });
      }

      return existingMeeting;
    }),

  getMany: protectedProcedure
    .input(getManyMeetingsSchema)
    .query(async ({ ctx, input }) => {
      const { search, page, pageSize, status, agentId } = input;

      const whereCondition = and(
        eq(meetings.userId, ctx.auth.user.id),
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
          totalCount: sql<number>`count(*) over()`,
        })
        .from(meetings)
        .innerJoin(agents, eq(meetings.agentId, agents.id))
        .where(whereCondition)
        .orderBy(desc(meetings.createdAt), desc(meetings.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      if (result.length === 0) {
        return {
          items: [],
          total: 0,
          totalPages: 0,
        };
      }

      const totalCount = result[0].totalCount;
      const totalPages = Math.ceil(totalCount / pageSize);

      return {
        items: result.map(({ totalCount, ...item }) => item),
        total: totalCount,
        totalPages,
      };
    }),

  create: protectedProcedure
    .input(meetingsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdMeetings] = await db
        .insert(meetings)
        .values({ ...input, userId: ctx.auth.user.id })
        .returning();

      // const call = streamVideo.video.call('default', createdMeetings.id);
      // await call.create({
      //   data: {
      //     created_by_id: ctx.auth.user.id,
      //     custom: {
      //       meetingId: createdMeetings.id,
      //       meetingName: createdMeetings.name,
      //     },
      //     settings_override: {
      //       transcription: {
      //         language: 'en',
      //         mode: 'auto-on',
      //         closed_caption_mode: 'auto-on',
      //       },
      //       recording: {
      //         mode: 'auto-on',
      //         quality: '1080p',
      //       },
      //     },
      //   },
      // });

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

      // await streamVideo.upsertUsers([
      //   {
      //     id: ctx.auth.user.id,
      //     name: ctx.auth.user.name,
      //     role: 'user',
      //     image: generateAvatarUri({
      //       seed: existingAgent.name,
      //       variant: 'botttsNeutral',
      //     }),
      //   },
      // ]);
      return createdMeetings;
    }),
});
