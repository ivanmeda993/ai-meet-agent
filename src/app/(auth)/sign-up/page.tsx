import { authRequired } from '@/lib/auth-required';
import { SignUpView } from '@/modules/auth/ui/views/sign-up-view';

export default async function SignUpPage() {
  await authRequired({
    rule: 'redirectIfHasSession',
    redirectTo: '/',
  });

  return <SignUpView />;
}
