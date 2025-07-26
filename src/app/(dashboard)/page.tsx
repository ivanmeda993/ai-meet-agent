import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { HomeView } from '@/modules/home/ui/views/home-view';
import { HydrateClient } from '@/trpc/hydrate-client';
import { prefetch, trpc } from '@/trpc/server';

export default async function HomePage() {
  // Check if the user is logged in
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/sign-in');
  }

  prefetch(trpc.agents.getMany.queryOptions({}));

  return (
    <HydrateClient>
      <HomeView />
    </HydrateClient>
  );
}
