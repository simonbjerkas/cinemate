'use client';

import { HeroSection } from './hero';
import { MovieActions } from './_actions';
import { MovieCredits } from './credits';
import { MovieDetails } from './details';
import { MovieActivity } from './activity';
import { UnauthenticatedMovieActions } from './_actions/unauthenticated';

import { getMovieDetails } from '@/lib/api';
import { cn, transformMovie } from '@/lib/utils';
import { api } from '@/convex/_generated/api';

import { useQuery as useConvexQuery } from 'convex/react';
import { useQuery } from '@tanstack/react-query';
import { use } from 'react';
import { ProvidersSection } from './providers';

interface MoviePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function MoviePage({ params }: MoviePageProps) {
  const { id } = use(params);
  const movieId = Number(id);
  const user = useConvexQuery(api.users.getUser);
  const { data: movie } = useQuery({
    queryKey: [movieId],
    queryFn: () => getMovieDetails(movieId),
    enabled: !!id,
  });

  return (
    <div className="flex flex-col gap-8 py-8">
      <HeroSection movie={movie} movieId={movieId} />
      <section className="grid gap-8 md:grid-cols-3">
        <MovieDetails movie={movie} />
        {user ? (
          <MovieActions movie={movie ? transformMovie(movie) : undefined} />
        ) : (
          <UnauthenticatedMovieActions id={movieId} />
        )}
      </section>
      <section className={cn(user && 'grid gap-8 md:grid-cols-2')}>
        {user && <MovieActivity movieId={movieId} movieTitle={movie?.title || ''} />}
        <ProvidersSection movieId={movieId} locale={user?.provider_locale || ['US']} />
      </section>
      <MovieCredits movieId={movieId} />
    </div>
  );
}
