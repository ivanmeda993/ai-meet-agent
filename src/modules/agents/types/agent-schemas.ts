import z from 'zod';

export const getOneInputSchema = z.object({
  id: z.string().min(1, { message: 'ID is required' }),
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
