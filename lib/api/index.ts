import { MovieCredits, MovieDetails, MovieProviderResponse, MovieSearchResponse } from '@/lib/types';
import { transformMovie } from '@/lib/utils';

export async function searchMovies(query: string) {
  const res = await fetch(`/api/movies?query=${encodeURIComponent(query)}`);
  if (!res.ok) {
    throw new Error('Failed to search movies');
  }
  return res.json() as Promise<MovieSearchResponse>;
}

export async function getMovieDetails(id: number) {
  const res = await fetch(`/api/movies?id=${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch movie details');
  }
  return res.json() as Promise<MovieDetails>;
}

export async function getPopularMovies() {
  const res = await fetch('/api/movies?popular=true');
  if (!res.ok) {
    throw new Error('Failed to fetch movies');
  }
  const data = (await res.json()) as MovieSearchResponse;
  return data.results.map(transformMovie);
}

export async function getTrendingMovies() {
  const res = await fetch('/api/movies?trending=true');
  if (!res.ok) {
    throw new Error('Failed to fetch movies');
  }
  const data = (await res.json()) as MovieSearchResponse;
  return data.results.map(transformMovie);
}

export async function getMainMovies() {
  const res = await fetch('/api/movies?trending=true');
  if (!res.ok) {
    throw new Error('Failed to fetch movies');
  }
  const data = (await res.json()) as MovieSearchResponse;
  return data.results.slice(0, 5);
}

export async function getMovieCredits(movieId: number) {
  const res = await fetch(`/api/movies?credits=${movieId}`);
  if (!res.ok) {
    throw new Error('Failed to fetch movie credits');
  }
  return res.json() as Promise<MovieCredits>;
}

export async function getMovieProviders({ movieId, countries }: { movieId: number; countries: string[] }) {
  const res = await fetch(`/api/movies?providers=${movieId}`);
  if (!res.ok) {
    throw new Error('Failed to fetch movie providers');
  }
  const data = (await res.json()) as MovieProviderResponse;
  return countries.map(country => ({ locale: country, ...data.results[country] }));
}
