'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { Movie, TMDBMovie } from '@/lib/types';
import { transformMovie } from '@/lib/utils';
import { api } from '@/convex/_generated/api';

import { useMutation, useQuery } from 'convex/react';

export function MovieActions({ id, movie }: { id: number; movie?: TMDBMovie }) {
  const addEntry = useMutation(api.entries.add);
  const addToWatchlist = useMutation(api.watchlist.add);
  const removeFromWatchlist = useMutation(api.watchlist.remove);
  const inWatchlist = useQuery(api.watchlist.inWatchlist, {
    externalId: id,
  });

  const handleWatchlist = async (details?: Movie) => {
    if (!details) {
      return;
    }
    switch (inWatchlist) {
      case true:
        return removeFromWatchlist({ externalId: Number(id) });
      case false:
        return addToWatchlist(details);
      default:
        return;
    }
  };

  if (!movie) {
    return <MovieActionsSkeleton />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button
          className="w-full"
          variant={inWatchlist ? 'outline' : 'default'}
          onClick={async () => {
            const entry = transformMovie(movie);
            await handleWatchlist(entry);
          }}
        >
          {inWatchlist ? 'Added to Watchlist' : 'Add to Watchlist'}
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          onClick={async () => {
            const entry = transformMovie(movie);
            await addEntry({ ...entry, rating: 5, review: 'hei' });
          }}
        >
          Write a Review
        </Button>
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
