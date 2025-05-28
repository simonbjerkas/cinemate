'use client';

import { HeroSection } from './hero';
import { MovieActions } from './actions';
import { MovieDetails } from './details';

import { getMovieDetails } from '@/lib/api';

import { useQuery } from '@tanstack/react-query';
import { use } from 'react';

interface MoviePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function MoviePage({ params }: MoviePageProps) {
  const { id } = use(params);
  const { data: movie } = useQuery({
    queryKey: [id],
    queryFn: () => getMovieDetails(Number(id)),
    enabled: !!id,
  });

  return (
    <div className="py-8">
      <HeroSection movie={movie} />
      <section className="grid gap-8 md:grid-cols-3">
        <MovieDetails movie={movie} />
        <MovieActions id={Number(id)} movie={movie} />
      </section>
    </div>
  );
}
