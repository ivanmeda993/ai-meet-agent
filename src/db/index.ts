import { drizzle } from 'drizzle-orm/neon-http';

import { ENV } from '@/lib/env';

export const db = drizzle(ENV.DATABASE_URL);
