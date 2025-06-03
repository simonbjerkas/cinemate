'use client';

import { MovieCard } from '@/components/movie-card';
import { useQuery } from '@tanstack/react-query';
import { getTrendingMovies } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';

export default function MoviesPage() {
  const { data: movies } = useQuery({
    queryKey: ['trending-movies'],
    queryFn: () => getTrendingMovies(),
  });

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold">Movies</h1>
      <p className="text-muted-foreground text-sm">Popular movies right now</p>
      {movies ? (
        <div className="my-4 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {movies.map(movie => (
            <MovieCard key={movie.external_id} movie={movie} />
          ))}
        </div>
      ) : (
        <MoviesSkeleton />
      )}
    </div>
  );
}

function MoviesSkeleton() {
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
