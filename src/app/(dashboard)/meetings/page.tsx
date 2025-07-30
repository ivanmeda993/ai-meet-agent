import { authRequired } from '@/lib/auth-required';
import { loadMeetingsSearchParams } from '@/modules/meetings/types/meeting-params';
import { MeetingsListHeader } from '@/modules/meetings/ui/components/meetings-list-header';
import { MeetingsView } from '@/modules/meetings/ui/views/meetings-view';
import { HydrateClient } from '@/trpc/hydrate-client';
import { prefetch, trpc } from '@/trpc/server';

interface MeetingsPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  const filters = await loadMeetingsSearchParams(searchParams);

  await authRequired({
    rule: 'redirectIfNoSession',
    redirectTo: '/sign-in',
  });

  prefetch(trpc.meetings.getMany.queryOptions({ ...filters }));

  return (
    <>
      <MeetingsListHeader />
      <HydrateClient>
        <MeetingsView />
      </HydrateClient>
    </>
  );
}
