'use client';

import { Button } from '@/components/ui/button';

import { Metadata } from 'next';

import { useEffect } from 'react';

export const metadata: Metadata = {
  title: 'Error',
  description: 'An unexpected error occurred',
};

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <p className="text-muted-foreground text-center">{error.message || 'An unexpected error occurred'}</p>
      <Button onClick={() => reset()} variant="outline">
        Try again
      </Button>
    </div>
  );
}
