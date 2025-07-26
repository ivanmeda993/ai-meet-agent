import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { AgentsView } from '@/modules/agents/ui/views /agents-view';
import { HydrateClient } from '@/trpc/hydrate-client';
import { prefetch, trpc } from '@/trpc/server';

export default async function AgentsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/sign-in');
  }

  prefetch(trpc.agents.getMany.queryOptions());

  return (
    <HydrateClient>
      <AgentsView />
    </HydrateClient>
  );
}
