'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { FormInput } from '@/components/form-inputs/form-input';
import { FormTextarea } from '@/components/form-inputs/form-textarea';
import { GeneratedAvatar } from '@/components/generated-avatar';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useTRPC } from '@/trpc/client';

import {
  agentsCreateSchema,
  type AgentsCreateSchemaInputs,
} from '../../types/agent-schemas';
import { type AgentGetOne } from '../../types/agent-types';

interface AgentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
}

export const AgentForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: AgentFormProps) => {
  const trpc = useTRPC();

  const queryClient = useQueryClient();

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async () => {
        const result = await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions(),
        );

        console.log('result: ', result);

        onSuccess?.();
        toast.success('Agent created');
      },
      onError: (error) => {
        toast.message(error.message);
      },
    }),
  );

  const updateAgent = useMutation(
    trpc.agents.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions());
        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues.id }),
          );
        }
        onSuccess?.();
        toast.success('Agent updated');
      },
      onError: (error) => {
        toast.message(error.message);
      },
    }),
  );

  const form = useForm<AgentsCreateSchemaInputs>({
    resolver: zodResolver(agentsCreateSchema),
    defaultValues: {
      name: initialValues?.name ?? '',
      instructions: initialValues?.instructions ?? '',
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createAgent.isPending || updateAgent.isPending;

  const onSubmit = (values: AgentsCreateSchemaInputs) => {
    if (isEdit) {
      updateAgent.mutate({ ...values, id: initialValues.id });
    } else {
      createAgent.mutate(values);
    }
  };

  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        <GeneratedAvatar
          seed={form.watch('name')}
          variant='botttsNeutral'
          className='border size-16'
        />
        <FormInput<AgentsCreateSchemaInputs>
          name='name'
          label='Name'
          isRequired
          placeholder='e.g Math tutor'
        />
        <FormTextarea<AgentsCreateSchemaInputs>
          name='instructions'
          label='Instructions'
          isRequired
          placeholder='e.g Assistant to help with Math'
        />

        <div className='flex justify-between gap-x-2'>
          {onCancel && (
            <Button
              variant='ghost'
              disabled={isPending}
              type='button'
              onClick={() => onCancel()}
            >
              Cancel
            </Button>
          )}
          <Button disabled={isPending} type='submit'>
            {isEdit ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
