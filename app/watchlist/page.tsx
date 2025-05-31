'use client';

import { MovieCard } from '@/components/movie-card';

import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';

export default function WatchlistPage() {
  const movies = useQuery(api.watchlist.getWatchlist);

  if (!movies) {
    return <div>Loading...</div>;
  }
  if (movies.length === 0) {
    return <div>No movies in watchlist</div>;
  }
  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold">Watchlist</h1>
      <p className="text-muted-foreground text-sm">Your saved movies</p>
      <div className="my-4 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
