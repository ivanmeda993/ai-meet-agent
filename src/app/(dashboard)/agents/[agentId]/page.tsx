import { authRequired } from '@/lib/auth-required';
import { AgentIdView } from '@/modules/agents/ui/views/agent-id-view';
import { HydrateClient } from '@/trpc/hydrate-client';
import { prefetch, trpc } from '@/trpc/server';

interface Props {
  params: Promise<{ agentId: string }>;
}

const Page = async ({ params }: Props) => {
  await authRequired({
    rule: 'redirectIfNoSession',
    redirectTo: '/sign-in',
  });

  const { agentId } = await params;

  prefetch(
    trpc.agents.getOne.queryOptions({
      id: agentId,
    }),
  );
  return (
    <HydrateClient>
      <AgentIdView agentId={agentId} />
    </HydrateClient>
  );
};

export default Page;
