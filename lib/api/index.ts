import { MovieDetails, MovieSearchResponse } from "@/lib/types";

export async function searchMovies(query: string) {
  const res = await fetch(`/api/movies?query=${encodeURIComponent(query)}`);
  if (!res.ok) {
    throw new Error("Failed to search movies");
  }
  return res.json() as Promise<MovieSearchResponse>;
}

export async function getMovieDetails(id: number) {
  const res = await fetch(`/api/movies?id=${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch movie details");
  }
  return res.json() as Promise<MovieDetails>;
}
