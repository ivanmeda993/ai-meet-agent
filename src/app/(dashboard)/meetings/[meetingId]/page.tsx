import { authRequired } from '@/lib/auth-required';
import { MeetingIdView } from '@/modules/meetings/ui/views/meeting-id-view';
import { HydrateClient } from '@/trpc/hydrate-client';
import { prefetch, trpc } from '@/trpc/server';

interface Props {
  params: Promise<{ meetingId: string }>;
}

export default async function MeetingPage({ params }: Props) {
  await authRequired({
    rule: 'redirectIfNoSession',
    redirectTo: '/sign-in',
  });

  const { meetingId } = await params;

  prefetch(
    trpc.meetings.getOne.queryOptions({
      id: meetingId,
    }),
  );

  return (
    <HydrateClient>
      <MeetingIdView meetingId={meetingId} />
    </HydrateClient>
  );
}
