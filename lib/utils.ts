import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Movie, TMDBMovie } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transformMovie(movie: TMDBMovie): Movie {
  return {
    external_id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path ?? undefined,
    release_date: movie.release_date,
  };
}
