'use client';

import { MovieCard } from '@/components/movie-card';
import { Skeleton } from '@/components/ui/skeleton';
import { getTrendingMovies } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export function TrendingMoviesSection() {
  const { data: trendingMovies, isLoading } = useQuery({
    queryKey: ['trending-movies'],
    queryFn: () => getTrendingMovies(),
  });

  if (isLoading) {
    return <TrendingSkeleton />;
  }

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">Featured Movies</h2>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {trendingMovies?.map(movie => <MovieCard key={movie.external_id} movie={movie} />)}
      </div>
    </section>
  );
}

function TrendingSkeleton() {
  return (
    <section>
      <Skeleton className="mb-6 h-8 w-48" />
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="aspect-[2/3] w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </section>
  );
}
