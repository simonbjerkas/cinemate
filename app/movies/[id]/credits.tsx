'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getMovieCredits } from '@/lib/api';
import { mergeMovieCredits } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function MovieCredits({ movieId }: { movieId: number }) {
  const [castLimit, setCastLimit] = useState(6);
  const [crewLimit, setCrewLimit] = useState(3);

  const { data: credits } = useQuery({
    queryKey: ['movie-credits', movieId],
    queryFn: () => getMovieCredits(movieId),
  });

  if (!credits) {
    return null;
  }
  const { cast, crew } = mergeMovieCredits(credits);

  const visibleCast = cast.slice(0, castLimit);
  const visibleCrew = crew.slice(0, crewLimit);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Cast</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {visibleCast.map(cast => (
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
      {cast.length > castLimit && (
        <Button variant="outline" onClick={() => setCastLimit(prev => prev + 6)} className="w-full">
          Load More Cast
        </Button>
      )}

      <h2 className="text-2xl font-bold">Crew</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {visibleCrew.map((crew, index) => (
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
      {crew.length > crewLimit && (
        <Button variant="outline" onClick={() => setCrewLimit(prev => prev + 3)} className="w-full">
          Load More Crew
        </Button>
      )}
    </div>
  );
}
