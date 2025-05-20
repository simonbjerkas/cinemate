export interface Movie {
  id: string;
  title: string;
  year: number;
  posterUrl: string;
  backdropUrl: string;
  director: string;
  genres: string[];
  rating: number;
  description: string;
  runtime: number;
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
