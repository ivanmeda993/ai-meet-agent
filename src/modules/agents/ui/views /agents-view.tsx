'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useTRPC } from '@/trpc/client';

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  console.log('data: ', data);

  return (
    <div className='flex flex-col p-4 gap-y-4'>
      {data?.map((agent) => (
        <div key={agent.id}>
          <p>{agent.name}</p>
        </div>
      ))}
      <p>{data?.length}</p>
    </div>
  );
};
