/**
 * Examples of how to use the FormTextarea component
 * This file demonstrates various usage patterns and configurations
 */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormTextarea } from '@/components/form-inputs/form-textarea';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

// Example form schema
const formSchema = z.object({
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description cannot exceed 500 characters'),
  notes: z.string().optional(),
  feedback: z
    .string()
    .min(1, 'Feedback is required')
    .max(1000, 'Feedback cannot exceed 1000 characters'),
  bio: z.string().max(200, 'Bio cannot exceed 200 characters').optional(),
});

type FormData = z.infer<typeof formSchema>;

export function FormTextareaExamples() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      notes: '',
      feedback: '',
      bio: '',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('Form data:', data);
  };

  return (
    <div className='space-y-8 p-6 max-w-2xl'>
      <h2 className='text-2xl font-bold'>FormTextarea Examples</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          {/* Example 1: Basic textarea */}
          <div>
            <h3 className='text-lg font-semibold mb-2'>Basic Textarea</h3>
            <FormTextarea
              name='description'
              label='Description'
              placeholder='Enter a description...'
              isRequired
            />
          </div>

          {/* Example 2: Textarea with custom rows */}
          <div>
            <h3 className='text-lg font-semibold mb-2'>Custom Rows</h3>
            <FormTextarea
              name='notes'
              label='Notes'
              placeholder='Add your notes here...'
              rows={5}
            />
          </div>

          {/* Example 3: Textarea with character count */}
          <div>
            <h3 className='text-lg font-semibold mb-2'>With Character Count</h3>
            <FormTextarea
              name='feedback'
              label='Feedback'
              placeholder='Share your feedback...'
              isRequired
              maxLength={1000}
              showCharCount
              rows={4}
            />
          </div>

          {/* Example 4: Textarea with suffix and character count */}
          <div>
            <h3 className='text-lg font-semibold mb-2'>
              With Suffix & Character Count
            </h3>
            <FormTextarea
              name='bio'
              label='Bio'
              placeholder='Tell us about yourself...'
              suffix='📝'
              maxLength={200}
              showCharCount
              rows={3}
            />
          </div>

          {/* Example 5: Disabled textarea */}
          <div>
            <h3 className='text-lg font-semibold mb-2'>Disabled State</h3>
            <FormTextarea
              name='description'
              label='Disabled Textarea'
              placeholder='This textarea is disabled'
              disabled
              rows={2}
            />
          </div>

          {/* Example 6: Custom styling */}
          <div>
            <h3 className='text-lg font-semibold mb-2'>Custom Styling</h3>
            <FormTextarea
              name='notes'
              label='Custom Styled'
              placeholder='Custom styled textarea...'
              className='mb-4'
              textareaClassName='border-2 border-primary/20 focus-visible:border-primary'
              rows={3}
            />
          </div>

          <Button type='submit' className='w-full'>
            Submit Form
          </Button>
        </form>
      </Form>

      {/* Display form values for debugging */}
      <div className='mt-8 p-4 bg-muted rounded-lg'>
        <h3 className='font-semibold mb-2'>Form Values (Debug):</h3>
        <pre className='text-sm overflow-auto'>
          {JSON.stringify(form.watch(), null, 2)}
        </pre>
      </div>
    </div>
  );
}

// Example with validation states
export function FormTextareaValidationExample() {
  const validationSchema = z.object({
    message: z
      .string()
      .min(5, 'Message must be at least 5 characters')
      .max(100, 'Message cannot exceed 100 characters'),
  });

  type ValidationData = z.infer<typeof validationSchema>;

  const form = useForm<ValidationData>({
    resolver: zodResolver(validationSchema),
    mode: 'onChange', // Validate on change for real-time feedback
    defaultValues: {
      message: '',
    },
  });

  return (
    <div className='space-y-4 p-6 max-w-md'>
      <h3 className='text-lg font-semibold'>Real-time Validation</h3>

      <Form {...form}>
        <FormTextarea
          name='message'
          label='Message'
          placeholder='Type your message...'
          isRequired
          maxLength={100}
          showCharCount
          rows={4}
        />
      </Form>
    </div>
  );
}
