'use client';

import { HeroSection } from './hero';
import { MovieActions, UnauthenticatedMovieActions } from './actions';
import { MovieDetails } from './details';
import { MovieActivity } from './activity';
import { MovieCredits } from './credits';

import { getMovieDetails } from '@/lib/api';
import { api } from '@/convex/_generated/api';

import { useQuery as useConvexQuery } from 'convex/react';
import { useQuery } from '@tanstack/react-query';
import { use } from 'react';

interface MoviePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function MoviePage({ params }: MoviePageProps) {
  const { id } = use(params);
  const user = useConvexQuery(api.users.getUser);
  const { data: movie } = useQuery({
    queryKey: [id],
    queryFn: () => getMovieDetails(Number(id)),
    enabled: !!id,
  });

  return (
    <div className="flex flex-col gap-8 py-8">
      <HeroSection movie={movie} />
      <section className="grid gap-8 md:grid-cols-3">
        <MovieDetails movie={movie} />
        {user ? <MovieActions id={Number(id)} movie={movie} /> : <UnauthenticatedMovieActions id={Number(id)} />}
      </section>
      {user && <MovieActivity movieId={Number(id)} />}
      <MovieCredits movieId={Number(id)} />
    </div>
  );
}
