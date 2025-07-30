'use client';
import { PlusIcon, XCircleIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { DEFAULT_PAGE } from '@/lib/constants';

import { useMeetingsFilters } from '../../hooks/use-meetings-filters';
import { MeetingAgentIdFilter } from './meeting-agents-id-filter';
import { MeetingStatusFilter } from './meeting-status-filter';
import { MeetingsSearchFilter } from './meetings-search-filter';
import { NewMeetingDialog } from './new-meeting-dialog';

export const MeetingsListHeader = () => {
  const { filters, setFilters } = useMeetingsFilters();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAnyFilterModified =
    !!filters.status || !!filters.search || !!filters.agentId;

  const onClearFilters = () => {
    setFilters({
      status: null,
      agentId: '',
      search: '',
      page: DEFAULT_PAGE,
    });
  };

  return (
    <>
      <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className='py-4 px-4 md:px-8 flex flex-col gap-y-4'>
        <div className='flex items-center justify-between'>
          <h5 className='font-medium text-xl'>My Meetings</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon /> New Meeting
          </Button>
        </div>
        <ScrollArea>
          <div className='flex items-center gap-x-2 p-1'>
            <MeetingsSearchFilter />
            <MeetingStatusFilter />
            <MeetingAgentIdFilter />
            {isAnyFilterModified && (
              <Button variant='outline' onClick={onClearFilters}>
                <XCircleIcon className='size-4' />
                Clear
              </Button>
            )}
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </div>
    </>
  );
};
