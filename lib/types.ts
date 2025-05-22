export interface Movie {
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
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  bio: string;
  watchlistCount: number;
  watchedCount: number;
  followersCount: number;
  followingCount: number;
}

export interface Review {
  id: string;
  userId: string;
  movieId: string;
  rating: number;
  content: string;
  createdAt: string;
  likes: number;
}

export interface List {
  id: string;
  userId: string;
  title: string;
  description: string;
  movies: Movie[];
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  userId: string;
  type: "review" | "list" | "watchlist" | "rating";
  content: string;
  createdAt: string;
  movieId?: string;
  listId?: string;
}

export interface MovieDetails extends Movie {
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
