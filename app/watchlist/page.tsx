'use client';

import { MovieCard } from '@/components/movie-card';
import { Skeleton } from '@/components/ui/skeleton';

import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Watchlist',
  description: 'Your saved movies',
};

export default function WatchlistPage() {
  const movies = useQuery(api.watchlist.getWatchlist);

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold">Watchlist</h1>
      <p className="text-muted-foreground text-sm">Your saved movies</p>
      {!movies ? (
        <WatchlistSkeleton />
      ) : movies.length === 0 ? (
        <div>No movies in watchlist</div>
      ) : (
        <div className="my-4 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

function WatchlistSkeleton() {
  return (
    <div className="my-4 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="aspect-[2/3] w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
