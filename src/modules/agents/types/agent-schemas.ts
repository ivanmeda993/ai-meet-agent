import z from 'zod';

import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from '@/lib/constants';

export const getOneInputSchema = z.object({
  id: z.string().min(1, { message: 'ID is required' }),
});

export const agentsGetManyInputSchema = z.object({
  page: z.number().default(DEFAULT_PAGE),
  pageSize: z
    .number()
    .min(MIN_PAGE_SIZE)
    .max(MAX_PAGE_SIZE)
    .default(DEFAULT_PAGE_SIZE),
  search: z.string().nullish(),
});

export const agentsCreateSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  instructions: z.string().min(1, { message: 'Instructions are required' }),
});

export type AgentsCreateSchemaInputs = z.infer<typeof agentsCreateSchema>;

export const updateAgentSchema = agentsCreateSchema.extend({
  id: z.string().min(1, { message: 'ID is required' }),
});

export type UpdateAgentSchemaInputs = z.infer<typeof updateAgentSchema>;
