import { authRequired } from '@/lib/auth-required';
import { CallView } from '@/modules/call/ui/views/call-view';
import { HydrateClient } from '@/trpc/hydrate-client';
import { prefetch, trpc } from '@/trpc/server';

interface Props {
  params: Promise<{
    meetingId: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { meetingId } = await params;

  await authRequired({
    rule: 'redirectIfNoSession',
    redirectTo: '/sign-in',
  });

  prefetch(
    trpc.meetings.getOne.queryOptions({
      id: meetingId,
    }),
  );

  return (
    <HydrateClient>
      <CallView meetingId={meetingId} />
    </HydrateClient>
  );
};

export default Page;
