import { type inferRouterOutputs } from '@trpc/server';

import { agentsRouter } from '@/modules/agents/server/agents-procedures';
import { meetingsRouter } from '@/modules/meetings/server/meeting-procedures';

import { createTRPCRouter } from '../init';
export const appRouter = createTRPCRouter({
  agents: agentsRouter,
  meetings: meetingsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
export type AppRouterOutputs = inferRouterOutputs<AppRouter>;
