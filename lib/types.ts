import { Doc } from '@/convex/_generated/dataModel';

export interface TMDBMovie {
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
}

export interface MovieSearchResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

export interface MovieDetails extends TMDBMovie {
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  imdb_id: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string | null;
}

export interface MovieCredits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface MoviePerson {
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
}

export interface CastMember extends MoviePerson {
  cast_id: number;
  character: string;
  order: number;
}

export interface CrewMember extends MoviePerson {
  department: string;
  job: string;
}

// Local movie type
export type Movie = Omit<Doc<'movies'>, '_id' | '_creationTime' | 'last_updated'>;

export type Entry = Doc<'movie_entries'>;
