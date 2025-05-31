import { NextRequest, NextResponse } from 'next/server';

import { MovieCredits, MovieDetails, MovieSearchResponse } from '@/lib/types';
import { handleCors } from '@/lib/api/cors';
import { tmdbFetch } from '@/lib/api/utils';

export async function GET(request: NextRequest) {
  const corsHeaders = handleCors(request);
  const { searchParams } = new URL(request.url);

  const query = searchParams.get('query');
  const id = searchParams.get('id');
  const credits = searchParams.get('credits');
  const popular = searchParams.get('popular');
  const trending = searchParams.get('trending');

  try {
    if (id) {
      // Get movie details
      const data = await tmdbFetch<MovieDetails>(`/movie/${id}`);
      return NextResponse.json(data, { headers: corsHeaders });
    }

    if (query) {
      // Search movies
      const data = await tmdbFetch<MovieSearchResponse>(`/search/movie?query=${query}&page=1`);
      return NextResponse.json(data, { headers: corsHeaders });
    }

    if (credits) {
      // Get movie credits
      const data = await tmdbFetch<MovieCredits>(`/movie/${credits}/credits?page=1`);
      return NextResponse.json(data, { headers: corsHeaders });
    }

    if (popular) {
      // Get popular movies
      const data = await tmdbFetch<MovieSearchResponse>(`/movie/popular?page=1`);
      return NextResponse.json(data, { headers: corsHeaders });
    }

    if (trending) {
      // Get trending movies
      const data = await tmdbFetch<MovieSearchResponse>(`/trending/movie/day?page=1`);
      return NextResponse.json(data, { headers: corsHeaders });
    }

    return NextResponse.json({ error: 'Missing query or id parameter' }, { status: 400, headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data: ' + error }, { status: 500, headers: corsHeaders });
  }
}

export async function OPTIONS(request: NextRequest) {
  const corsHeaders = handleCors(request);
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: corsHeaders,
    },
  );
}
