import type { AppRouterOutputs } from '@/trpc/routers/_app';

export type AgentGetOne = AppRouterOutputs['agents']['getOne'];
export type AgentsGetMany = AppRouterOutputs['agents']['getMany']['items'];
