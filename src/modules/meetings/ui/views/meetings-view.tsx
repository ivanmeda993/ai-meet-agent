'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { DataPagination } from '@/components/data-table/data-pagination';
import { DataTable } from '@/components/data-table/data-table';
import { EmptyState } from '@/components/empty-state';
import { useTRPC } from '@/trpc/client';

import { useMeetingsFilters } from '../../hooks/use-meetings-filters';
import { meetingColumns } from '../components/meeting-columns';

export const MeetingsView = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const { apiFilters, setFilters } = useMeetingsFilters();
  const { data } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions({ ...apiFilters }),
  );

  if (data.total === 0) {
    return (
      <EmptyState
        title='Create your first meeting'
        description='Schedule a meeting to connect with others. Each meeting lets you collaborate, share ideas, and interact with participants in real time.'
      />
    );
  }

  return (
    <div className='flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4'>
      <DataTable
        data={data.items}
        columns={meetingColumns}
        onRowClick={(row) => router.push(`/meetings/${row.id}`)}
      />
      <DataPagination
        totalSearchCount={data.totalSearchCount}
        page={apiFilters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
    </div>
  );
};
