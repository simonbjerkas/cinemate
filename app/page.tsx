'use client';

import { Button } from '@/components/ui/button';
import { HomeSkeleton } from '@/components/skeletons/home';
import { MovieCard } from '@/components/movie-card';

import { getMovies } from '@/lib/api';
import { Movie } from '@/lib/types';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getMovies();
      setMovies(data.results);
    };
    fetchMovies();
  }, []);
  if (movies.length === 0) {
    return <HomeSkeleton />;
  }
  return (
    <div className="py-8">
      {/* Hero Section */}
      <section className="relative container mx-auto mb-12 h-[60vh] overflow-hidden rounded-xl">
        <Image
          src={`https://image.tmdb.org/t/p/original/${movies[0].backdrop_path}`}
          alt={movies[0].title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="absolute right-0 bottom-0 left-0 p-8">
            <h1 className="mb-4 text-4xl font-bold text-white">{movies[0].title}</h1>
            <p className="mb-6 max-w-2xl text-lg text-gray-200">{movies[0].overview}</p>
            <Button asChild size="lg">
              <Link href={`/movies/${movies[0].id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Recent Activity</h2>
        <div className="space-y-4">
          {[
            {
              id: 1,
              userId: 1,
              content: 'Activity 1',
              createdAt: new Date(),
            },
            {
              id: 2,
              userId: 2,
              content: 'Activity 2',
              createdAt: new Date(),
            },
            {
              id: 3,
              userId: 3,
              content: 'Activity 3',
              createdAt: new Date(),
            },
            {
              id: 4,
              userId: 4,
              content: 'Activity 4',
              createdAt: new Date(),
            },
          ].map(activity => (
            <Card key={activity.id}>
              <CardHeader>
                <CardTitle>{activity.content}</CardTitle>
                <CardDescription>{activity.createdAt.toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{activity.content}</p>
                <p>{activity.createdAt.toLocaleDateString()}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Movies */}
      <section>
        <h2 className="mb-6 text-2xl font-bold">Featured Movies</h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
}
