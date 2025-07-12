// lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  DATABASE_URL: z.url(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  // eslint-disable-next-line no-console
  console.error(
    '❌ Invalid environment variables:',
    z.flattenError(parsedEnv.error),
  );
  throw new Error('Invalid environment variables');
}

export const ENV = parsedEnv.data;
