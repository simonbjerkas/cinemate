"use client";

import { getMovieDetails } from "@/lib/api";
import { MovieDetails } from "@/lib/types";

import Image from "next/image";
import { useEffect, useState } from "react";

interface MoviePageProps {
  params: {
    id: string;
  };
}

export default function MoviePage({ params }: MoviePageProps) {
  const { id } = params;
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
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative mb-8 h-[50vh] overflow-hidden rounded-xl">
        <Image
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-8">
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
                  {movie.title} ({movie.release_date.split("-")[0]})
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Details */}
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">Overview</h2>
            <p className="text-gray-700">{movie.overview}</p>
          </section>
        </div>

        <div>
          <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full rounded-lg bg-yellow-500 px-4 py-2 text-center font-semibold text-black transition-colors hover:bg-yellow-400">
                Add to Watchlist
              </button>
              <button className="w-full rounded-lg border border-gray-300 px-4 py-2 text-center font-semibold transition-colors hover:bg-gray-50">
                Write a Review
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
