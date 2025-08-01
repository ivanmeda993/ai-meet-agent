'use client';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { VideoIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { GeneratedAvatar } from '@/components/generated-avatar';
import { Badge } from '@/components/ui/badge';
import { useConfirm } from '@/hooks/use-confirm';
import { useTRPC } from '@/trpc/client';

import { useAgentsFilters } from '../../hooks/use-agents-filters';
import { AgentIdViewHeader } from '../components/agent-id-view-header';
import { UpdateAgentDialog } from '../components/update-agents-dialog';

interface Props {
  agentId: string;
}

export const AgentIdView = ({ agentId }: Props) => {
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { apiFilters } = useAgentsFilters();

  const [UpdateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false);

  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId }),
  );

  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({
            ...apiFilters,
          }),
        );
        // invalidate free tier usage
        router.push('/agents');
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    'Are you sure',
    `The following action will remove ${data.meetingCount} associated meetings`,
  );

  const handleRemoveAgent = async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    await removeAgent.mutateAsync({ id: agentId });
  };

  return (
    <>
      <RemoveConfirmation />
      <UpdateAgentDialog
        open={UpdateAgentDialogOpen}
        onOpenChange={setUpdateAgentDialogOpen}
        initialValues={data}
      />
      <div className='flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4'>
        <AgentIdViewHeader
          agentId={agentId}
          agentName={data.name}
          onEdit={() => setUpdateAgentDialogOpen(true)}
          onRemove={handleRemoveAgent}
        />
        <div className='bg-white rounded-lg border'>
          <div className='px-4 py-5 gap-y-5 flex flex-col col-span-5'>
            <div className='flex items-center gap-x-3'>
              <GeneratedAvatar
                variant='botttsNeutral'
                seed={data.name}
                className='size-10'
              />
              <h2 className='text-2xl font-medium'>{data.name}</h2>
            </div>
            <Badge
              variant='outline'
              className='flex items-center gap-x-2 [&>svg]:size-4'
            >
              <VideoIcon className='text-blue-700' />
              {data.meetingCount}{' '}
              {data.meetingCount === 1 ? 'meeting' : 'meetings'}
            </Badge>
            <div className='flex flex-col gap-y-4'>
              <div className='text-lg font-medium'>Instructions</div>
              <div className='text-neutral-800'>{data.instructions}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
