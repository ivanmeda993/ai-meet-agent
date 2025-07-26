'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

/**
 * A reusable error fallback component that can be used with ErrorBoundary
 * Follows the project's design system and provides a consistent error UI
 */
export function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  return (
    <div className='flex items-center justify-center min-h-[200px] p-6'>
      <div className='w-full max-w-md'>
        <Alert variant='destructive'>
          <AlertTriangle className='h-4 w-4' />
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription className='mt-2'>
            {error.message || 'An unexpected error occurred'}
          </AlertDescription>
        </Alert>

        <div className='mt-4 flex justify-center'>
          <Button
            onClick={resetErrorBoundary}
            variant='outline'
            size='sm'
            className='gap-2'
          >
            <RefreshCw className='h-4 w-4' />
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * A minimal error fallback for inline use
 */
export function MinimalErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  return (
    <div className='flex items-center gap-2 p-2 text-sm text-destructive'>
      <AlertTriangle className='h-4 w-4' />
      <span>Error: {error.message}</span>
      <Button
        onClick={resetErrorBoundary}
        variant='ghost'
        size='sm'
        className='h-auto p-1 text-xs'
      >
        Retry
      </Button>
    </div>
  );
}
