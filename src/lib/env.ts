// lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  DATABASE_URL: z.url(),
  BETTER_AUTH_SECRET: z
    .string()
    .min(10, 'BETTER_AUTH_SECRET must be at least 10 characters long'),
  BETTER_AUTH_URL: z.url('BETTER_AUTH_URL must be a valid URL'),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    '❌ Invalid environment variables:',
    z.flattenError(parsedEnv.error),
  );
  throw new Error('Invalid environment variables');
}

export const ENV = parsedEnv.data;
