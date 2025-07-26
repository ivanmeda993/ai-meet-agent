import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import { agents } from '@/db/schema';
import { createTRPCRouter, protectedProcedure } from '@/trpc/init';

import {
  agentsCreateSchema,
  getOneInputSchema,
  updateAgentSchema,
} from '../types/agent-schemas';

export const agentsRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(getOneInputSchema)
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, input.id))
        .limit(1);
      return existingAgent;
    }),

  getMany: protectedProcedure.query(async () => {
    const data = await db.select().from(agents);
    return data;
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
});
