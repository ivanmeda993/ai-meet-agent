import { TRPCError } from '@trpc/server';
import { and, count, desc, eq, getTableColumns, ilike, sql } from 'drizzle-orm';

import { db } from '@/db';
import { agents, meetings } from '@/db/schema';
import { createTRPCRouter, protectedProcedure } from '@/trpc/init';

import {
  agentsCreateSchema,
  agentsGetManyInputSchema,
  getOneInputSchema,
  updateAgentSchema,
} from '../types/agent-schemas';

export const agentsRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(getOneInputSchema)
    .query(async ({ input, ctx }) => {
      const [existingAgent] = await db
        .select({
          ...getTableColumns(agents),
          meetingCount: db.$count(meetings, eq(agents.id, meetings.agentId)),
        })
        .from(agents)
        .where(
          and(eq(agents.id, input.id), eq(agents.userId, ctx.auth.user.id)),
        );

      if (!existingAgent) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Agent not found',
        });
      }

      if (!existingAgent) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Agent not found',
        });
      }
      return existingAgent;
    }),

  getMany: protectedProcedure
    .input(agentsGetManyInputSchema)
    .query(async ({ ctx, input }) => {
      const { search, page, pageSize } = input;

      const whereCondition = and(
        eq(agents.userId, ctx.auth.user.id),
        search ? ilike(agents.name, `%${search}%`) : undefined,
      );

      const result = await db
        .select({
          ...getTableColumns(agents),
          meetingCount: sql<number>`(
          select count(*)
          from ${meetings}
          where ${eq(meetings.agentId, agents.id)}
        )`,
          totalSearchCount: sql<number>`count(*) over()`,
          totalCount: sql<number>`(
          select count(*)
          from ${agents}
          where ${eq(agents.userId, ctx.auth.user.id)}
        )`,
        })
        .from(agents)
        .where(whereCondition)
        .orderBy(desc(agents.createdAt), desc(agents.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      // Ako nema rezultata, vraćamo prazan odgovor
      if (result.length === 0) {
        const [totalCount] = await db
          .select({ count: count() })
          .from(agents)
          .where(eq(agents.userId, ctx.auth.user.id));

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
    .input(agentsCreateSchema)
    .mutation(async ({ input, ctx }) => {
      const {
        auth: { user },
      } = ctx;

      const [createdAgent] = await db
        .insert(agents)
        .values({
          ...input,
          userId: user.id,
        })
        .returning();

      return createdAgent;
    }),
  update: protectedProcedure
    .input(updateAgentSchema)
    .mutation(async ({ ctx, input }) => {
      const [updatedAgent] = await db
        .update(agents)
        .set(input)
        .where(
          and(eq(agents.id, input.id), eq(agents.userId, ctx.auth.user.id)),
        )
        .returning();

      if (!updatedAgent) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Agent not found',
        });
      }

      return updatedAgent;
    }),

  remove: protectedProcedure
    .input(getOneInputSchema)
    .mutation(async ({ ctx, input }) => {
      const [removedAgent] = await db
        .delete(agents)
        .where(
          and(eq(agents.id, input.id), eq(agents.userId, ctx.auth.user.id)),
        )
        .returning();

      if (!removedAgent) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Agent not found',
        });
      }

      return removedAgent;
    }),
});
