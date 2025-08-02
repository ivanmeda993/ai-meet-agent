'use client';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { MatchComponent } from '@/components/match-component';
import { useConfirm } from '@/hooks/use-confirm';
import { useTRPC } from '@/trpc/client';

import { ActiveState } from '../components/active-state';
import { CancelledState } from '../components/cancelled-state';
import { CompletedState } from '../components/completed-state';
import { MeetingIdViewHeader } from '../components/meeting-id-view-header';
import { ProcessingState } from '../components/processing-state';
import { UpcomingState } from '../components/upcoming-state';
import { UpdateMeetingDialog } from '../components/update-meeting-dialog';

interface Props {
  meetingId: string;
}

export const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    'Are you sure?',
    'The following action will remove this meeting',
  );

  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId }),
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));

        router.push('/meetings');
      },
    }),
  );

  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    await removeMeeting.mutateAsync({ id: meetingId });
  };

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={updateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValues={data}
      />
      <div className='flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4'>
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setUpdateMeetingDialogOpen(true)}
          onRemove={handleRemoveMeeting}
        />
        <MatchComponent
          value={data.status}
          cancelled={() => <CancelledState />}
          completed={() => <CompletedState data={data} />}
          active={() => <ActiveState meetingId={meetingId} />}
          upcoming={() => (
            <UpcomingState
              meetingId={meetingId}
              onCancelMeeting={() => {}}
              isCancelling={false}
            />
          )}
          processing={() => <ProcessingState />}
        />
      </div>
    </>
  );
};
