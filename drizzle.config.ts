import { defineConfig } from 'drizzle-kit';
import { ENV } from '@/lib/env';
import 'dotenv/config';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: ENV.DATABASE_URL,
  },
});
