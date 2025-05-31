import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Movie, MovieCredits, TMDBMovie, CastMember, CrewMember } from './types';

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

export function mergeMovieCredits(credits: MovieCredits): MovieCredits {
  // Create maps to track unique cast and crew members by their person ID
  const castMap = new Map<number, CastMember>();
  const crewMap = new Map<number, CrewMember>();

  // Process cast members
  credits.cast.forEach(member => {
    const existing = castMap.get(member.id);
    if (existing) {
      // If the person already exists in cast, keep the one with the lower order
      if (member.order < existing.order) {
        castMap.set(member.id, member);
      }
    } else {
      castMap.set(member.id, member);
    }
  });

  // Process crew members
  credits.crew.forEach(member => {
    const existing = crewMap.get(member.id);
    if (existing) {
      // If the person already exists in crew, merge their jobs
      crewMap.set(member.id, {
        ...existing,
        job: `${existing.job}, ${member.job}`,
      });
    } else {
      crewMap.set(member.id, member);
    }
  });

  return {
    id: credits.id,
    cast: Array.from(castMap.values()),
    crew: Array.from(crewMap.values()),
  };
}
