export async function tmdbFetch<T>(path: string, options: RequestInit = {}) {
  if (!process.env.TMDB_API_KEY) {
    throw new Error('TMDB_API_KEY is not set');
  }
  const url = path.includes('?')
    ? `https://api.themoviedb.org/3${path}&language=en-US`
    : `https://api.themoviedb.org/3${path}?include_adult=false&language=en-US`;
  console.log(url);
  const res = await fetch(url, {
    method: options.method || 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + process.env.TMDB_API_KEY,
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch movies: ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}
