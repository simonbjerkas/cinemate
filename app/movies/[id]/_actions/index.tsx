'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { ReviewAction } from './review';
import { WatchlistAction } from './watchlist';

import { Movie } from '@/lib/types';

import { useSearchParams } from 'next/navigation';

export function MovieActions({ movie }: { movie?: Movie }) {
  const searchParams = useSearchParams();
  const review = searchParams.get('review');

  if (!movie) {
    return <MovieActionsSkeleton />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <WatchlistAction movie={movie} />
        <ReviewAction movie={movie} review={review === 'true'} />
      </CardContent>
    </Card>
  );
}

function MovieActionsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}
