import { NextRequest, NextResponse } from 'next/server';
import { MovieCredits, MovieDetails, MovieSearchResponse } from '@/lib/types';
import { handleCors } from '@/lib/cors';

const url = 'https://api.themoviedb.org/3';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + process.env.TMDB_API_KEY,
  },
};

export async function GET(request: NextRequest) {
  if (!process.env.TMDB_API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  const corsHeaders = handleCors(request);
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const id = searchParams.get('id');
  const credits = searchParams.get('credits');
  const popular = searchParams.get('popular');

  try {
    if (id) {
      // Get movie details
      const res = await fetch(`${url}/movie/${id}?language=en-US`, options);
      const data = await res.json();
      return NextResponse.json(data as MovieDetails, { headers: corsHeaders });
    }

    if (query) {
      // Search movies
      const res = await fetch(`${url}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, options);
      const data = await res.json();
      return NextResponse.json(data as MovieSearchResponse, { headers: corsHeaders });
    }

    if (credits) {
      // Get movie credits
      const res = await fetch(`${url}/movie/${id}/credits?language=en-US`, options);
      const data = await res.json();
      return NextResponse.json(data as MovieCredits, { headers: corsHeaders });
    }

    if (popular) {
      // Get popular movies
      const res = await fetch(`${url}/movie/popular?language=en-US&page=1`, options);
      const data = await res.json();
      return NextResponse.json(data as MovieSearchResponse, { headers: corsHeaders });
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
