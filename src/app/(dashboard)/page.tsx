import { authRequired } from '@/lib/auth-required';
import { HomeView } from '@/modules/home/ui/views/home-view';
import { HydrateClient } from '@/trpc/hydrate-client';
import { prefetch, trpc } from '@/trpc/server';

export default async function HomePage() {
  // Check if the user is logged in
  await authRequired({
    rule: 'redirectIfNoSession',
    redirectTo: '/sign-in',
  });

  prefetch(trpc.agents.getMany.queryOptions({}));

  return (
    <HydrateClient>
      <HomeView />
    </HydrateClient>
  );
}
