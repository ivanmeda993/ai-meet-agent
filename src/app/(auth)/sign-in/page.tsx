import { authRequired } from '@/lib/auth-required';
import { SignInView } from '@/modules/auth/ui/views/sign-in-view';

export default async function SignInPage() {
  await authRequired({
    rule: 'redirectIfHasSession',
    redirectTo: '/',
  });
  return <SignInView />;
}
