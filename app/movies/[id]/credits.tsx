'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getMovieCredits } from '@/lib/api';
import { mergeMovieCredits } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { CastMember, CrewMember } from '@/lib/types';

export function MovieCredits({ movieId }: { movieId: number }) {
  const [castData, setCastData] = useState<{ limit: number; cast: CastMember[] }>({ limit: 6, cast: [] });
  const [crewData, setCrewData] = useState<{ limit: number; crew: CrewMember[] }>({ limit: 3, crew: [] });

  const { data: credits, isLoading } = useQuery({
    queryKey: ['movie-credits', movieId],
    queryFn: () => getMovieCredits(movieId),
  });

  useEffect(() => {
    if (credits) {
      const { cast, crew } = mergeMovieCredits(credits);
      setCastData(prev => ({ ...prev, cast }));
      setCrewData(prev => ({ ...prev, crew }));
    }
  }, [credits]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Cast</h2>
      {isLoading ? (
        <MovieCreditsSkeleton amount={6} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {castData.cast.slice(0, castData.limit).map(cast => (
            <Card key={`cast-${cast.id}`} className="w-full">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} alt={cast.name} />
                  <AvatarFallback>
                    {cast.name
                      .split(' ')
                      .slice(0, 2)
                      .map(name => name[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <CardTitle>{cast.name}</CardTitle>
                  <CardDescription>{cast.character}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
      {castData.cast.length > castData.limit && (
        <Button
          variant="outline"
          onClick={() => setCastData(prev => ({ ...prev, limit: prev.limit + 6 }))}
          className="w-full"
        >
          Load More Cast
        </Button>
      )}

      <h2 className="text-2xl font-bold">Crew</h2>
      {isLoading ? (
        <MovieCreditsSkeleton amount={3} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {crewData.crew.slice(0, crewData.limit).map((crew, index) => (
            <Card key={`crew-${crew.id}-${index}`}>
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage src={`https://image.tmdb.org/t/p/w500${crew.profile_path}`} alt={crew.name} />
                  <AvatarFallback>
                    {crew.name
                      .split(' ')
                      .slice(0, 2)
                      .map(name => name[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <CardTitle>{crew.name}</CardTitle>
                  <CardDescription>{crew.job}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
      {crewData.crew.length > crewData.limit && (
        <Button
          variant="outline"
          onClick={() => setCrewData(prev => ({ ...prev, limit: prev.limit + 3 }))}
          className="w-full"
        >
          Load More Crew
        </Button>
      )}
    </div>
  );
}

function MovieCreditsSkeleton({ amount }: { amount: number }) {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: amount }).map((_, index) => (
          <Card key={`cast-skeleton-${index}`} className="w-full">
            <CardHeader className="flex flex-row items-center gap-4">
              <Skeleton className="size-8 rounded-full" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-2 w-24" />
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
      <Skeleton className="h-9 w-full" />
    </>
  );
}
