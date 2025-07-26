/**
 * Simple test component for FormTextarea
 * Demonstrates basic functionality and validation
 */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormTextarea } from '@/components/form-inputs/form-textarea';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

const testSchema = z.object({
  message: z
    .string()
    .min(5, 'Message must be at least 5 characters')
    .max(100, 'Message cannot exceed 100 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .optional(),
});

type TestFormData = z.infer<typeof testSchema>;

export function FormTextareaTest() {
  const form = useForm<TestFormData>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      message: '',
      description: '',
    },
  });

  const onSubmit = (data: TestFormData) => {
    console.log('Form submitted:', data);
    alert(
      `Form submitted!\nMessage: ${data.message}\nDescription: ${data.description || 'N/A'}`,
    );
  };

  return (
    <div className='max-w-md mx-auto p-6 space-y-6'>
      <h2 className='text-2xl font-bold'>FormTextarea Test</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormTextarea
            name='message'
            label='Message'
            placeholder='Enter your message...'
            isRequired
            maxLength={100}
            showCharCount
            rows={3}
          />

          <FormTextarea
            name='description'
            label='Description'
            placeholder='Optional description...'
            rows={4}
            suffix='📝'
          />

          <Button type='submit' className='w-full'>
            Submit
          </Button>
        </form>
      </Form>

      <div className='mt-4 p-3 bg-muted rounded text-sm'>
        <strong>Current values:</strong>
        <pre>{JSON.stringify(form.watch(), null, 2)}</pre>
      </div>
    </div>
  );
}
