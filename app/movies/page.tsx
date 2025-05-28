'use client';

import { MovieCard } from '@/components/movie-card';
import { useQuery } from '@tanstack/react-query';
import { getTrendingMovies } from '@/lib/api';

export default function MoviesPage() {
  const { data: movies } = useQuery({
    queryKey: ['trending-movies'],
    queryFn: () => getTrendingMovies(),
  });
  if (!movies) {
    return <div>Loading...</div>;
  }
  return (
    <div className="py-8">
      <h1>Movies</h1>
      <p>Recently added movies</p>
      <div className="my-4 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {movies.map(movie => (
          <MovieCard key={movie.external_id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
