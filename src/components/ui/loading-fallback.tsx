'use client';

import { Loader2 } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';

/**
 * A reusable loading fallback component for Suspense boundaries
 * Provides different loading states based on the context
 */
export function LoadingFallback({
  message = 'Loading...',
}: {
  message?: string;
}) {
  return (
    <div className='flex items-center justify-center p-8'>
      <div className='flex items-center gap-2'>
        <Loader2 className='h-5 w-5 animate-spin text-primary' />
        <span className='text-muted-foreground'>{message}</span>
      </div>
    </div>
  );
}

/**
 * A skeleton loading fallback for content areas
 */
export function SkeletonFallback() {
  return (
    <div className='space-y-4 p-4'>
      <Skeleton className='h-8 w-3/4' />
      <Skeleton className='h-4 w-full' />
      <Skeleton className='h-4 w-5/6' />
      <Skeleton className='h-4 w-4/5' />
    </div>
  );
}

/**
 * A minimal loading spinner for inline use
 */
export function SpinnerFallback() {
  return (
    <div className='flex items-center justify-center p-2'>
      <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
    </div>
  );
}

/**
 * A card-style loading fallback
 */
export function CardLoadingFallback() {
  return (
    <div className='rounded-lg border bg-card p-6'>
      <div className='space-y-4'>
        <Skeleton className='h-6 w-1/3' />
        <div className='space-y-2'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-4/5' />
          <Skeleton className='h-4 w-3/5' />
        </div>
      </div>
    </div>
  );
}
