import { type SearchParams } from 'nuqs';

import { authRequired } from '@/lib/auth-required';
import { loadAgentsSearchParams } from '@/modules/agents/types/agent-params';
import { AgentsListHeader } from '@/modules/agents/ui/components/agents-list-header';
import { AgentsView } from '@/modules/agents/ui/views/agents-view';
import { HydrateClient } from '@/trpc/hydrate-client';
import { prefetch, trpc } from '@/trpc/server';

interface AgentsPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function AgentsPage({ searchParams }: AgentsPageProps) {
  const filters = await loadAgentsSearchParams(searchParams);

  await authRequired({
    rule: 'redirectIfNoSession',
    redirectTo: '/sign-in',
  });

  prefetch(trpc.agents.getMany.queryOptions({ ...filters }));

  return (
    <>
      <AgentsListHeader />
      <HydrateClient>
        <AgentsView />
      </HydrateClient>
    </>
  );
}
