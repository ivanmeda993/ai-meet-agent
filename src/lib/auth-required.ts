'server-only';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from './auth';

interface AuthRequired {
  redirectTo?: string;
  rule?: 'redirectIfHasSession' | 'redirectIfNoSession';
}
export const authRequired = async ({
  redirectTo = '/sign-in',
  rule = 'redirectIfNoSession',
}: AuthRequired) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (rule === 'redirectIfHasSession' && session) {
    redirect(redirectTo);
  }
  if (rule === 'redirectIfNoSession' && !session) {
    redirect(redirectTo);
  }
};
