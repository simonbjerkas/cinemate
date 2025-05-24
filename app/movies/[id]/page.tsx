'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getMovieDetails } from '@/lib/api';
import { MovieDetails } from '@/lib/types';

import Image from 'next/image';
import { use, useEffect, useState } from 'react';

interface MoviePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function MoviePage({ params }: MoviePageProps) {
  const { id } = use(params);
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  useEffect(() => {
    const fetchMovie = async () => {
      const movie = await getMovieDetails(Number(id));
      setMovie(movie);
    };
    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-8">
      {/* Hero Section */}
      <section className="relative mb-8 h-[50vh] overflow-hidden rounded-xl">
        <Image
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
          <div className="absolute right-0 bottom-0 left-0 p-8">
            <div className="flex items-end gap-8">
              <div className="relative h-48 w-32 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="mb-2 text-4xl font-bold text-white">
                  {movie.title} ({movie.release_date.split('-')[0]})
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Movie Details */}
      <section className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">Overview</h2>
            <p>{movie.overview}</p>
          </section>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full">Add to Watchlist</Button>
              <Button variant="secondary" className="w-full">
                Write a Review
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
