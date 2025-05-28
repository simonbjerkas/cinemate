'use client';

import { MovieCard } from '@/components/movie-card';

import { getTrendingMovies } from '@/lib/api';

import { useQuery } from '@tanstack/react-query';

export function TrendingMoviesSection() {
  const { data: trendingMovies } = useQuery({
    queryKey: ['trending-movies'],
    queryFn: () => getTrendingMovies(),
  });
  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">Featured Movies</h2>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {trendingMovies?.map(movie => <MovieCard key={movie.external_id} movie={movie} />)}
      </div>
    </section>
  );
}
