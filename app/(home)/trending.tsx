'use client';

import { MovieCard } from '@/components/movie-card';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getTrendingMovies } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export function TrendingMoviesSection() {
  const { data: trendingMovies, isLoading } = useQuery({
    queryKey: ['trending-movies'],
    queryFn: () => getTrendingMovies(),
  });

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">Featured Movies</h2>
      {!isLoading ? (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {trendingMovies?.map(movie => <MovieCard key={movie.external_id} movie={movie} />)}
        </div>
      ) : (
        <TrendingSkeleton />
      )}
    </section>
  );
}

function TrendingSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: 10 }).map((_, index) => (
        <Card key={index} className="relative aspect-[2/3] overflow-hidden transition-all duration-300 hover:scale-105">
          <Skeleton className="absolute inset-0" />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="z-10 inline-flex h-full flex-col justify-end gap-2">
            <CardHeader>
              <Skeleton className="h-6 w-3/4 max-w-[200px]" />
              <Skeleton className="h-4 w-1/2 max-w-[150px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
}
