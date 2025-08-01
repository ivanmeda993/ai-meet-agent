'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { DataPagination } from '@/components/data-table/data-pagination';
import { DataTable } from '@/components/data-table/data-table';
import { EmptyState } from '@/components/empty-state';
import { useTRPC } from '@/trpc/client';

import { useAgentsFilters } from '../../hooks/use-agents-filters';
import { agentColumns } from '../components/agent-columns';

export const AgentsView = () => {
  const router = useRouter();
  const { filters, apiFilters, setFilters } = useAgentsFilters();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({
      ...apiFilters,
    }),
  );

  if (data.total === 0) {
    return (
      <EmptyState
        title='Create your first agent'
        description='Create an agent to join your meeting. Each agent will follow your instructions and interact with participants during the call'
      />
    );
  }

  return (
    <div className='flex-1 pb-4 px-4 md:px-8 flex flex-col gapy-y-4'>
      <DataTable
        data={data.items}
        columns={agentColumns}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />
      <DataPagination
        totalSearchCount={data.totalSearchCount}
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
    </div>
  );
};
