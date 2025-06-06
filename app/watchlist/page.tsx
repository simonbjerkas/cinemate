'use client';

import { MovieCard } from '@/components/movie-card';
import { Skeleton } from '@/components/ui/skeleton';

import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';

export default function WatchlistPage() {
  const movies = useQuery(api.watchlist.getWatchlist);

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold">Watchlist</h1>
      <p className="text-muted-foreground text-sm">Your saved movies</p>
      {!movies ? (
        <WatchlistSkeleton />
      ) : movies.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <p className="text-lg font-medium">Your watchlist is empty</p>
          <p className="text-muted-foreground mt-2 text-sm">Add movies to your watchlist to see them here</p>
        </div>
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
