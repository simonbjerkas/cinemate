import { NextRequest } from 'next/server';

const validateOrigins = (origins: string[]) => {
  for (const origin of origins) {
    try {
      new URL(origin);
    } catch {
      throw new Error(`Invalid origin URL: ${origin}`);
    }

    if (!origin.startsWith('https://') && !origin.startsWith('http://localhost')) {
      console.warn(`Warning: Non-HTTPS origin detected: ${origin}`);
    }
  }
};

const getAllowedOrigins = () => {
  const originsEnv = process.env.ALLOWED_ORIGINS;

  if (!originsEnv) {
    throw new Error('ALLOWED_ORIGINS environment variable is required');
  }

  const origins = originsEnv
    .split(',')
    .map(origin => origin.trim())
    .filter(origin => origin.length > 0);

  validateOrigins(origins);

  return origins;
};

const ALLOWED_ORIGINS = getAllowedOrigins();

export function corsHeaders(origin?: string | null) {
  const isAllowedOrigin = origin && ALLOWED_ORIGINS.includes(origin);

  return {
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin : 'null',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  };
}

export function handleCors(request: NextRequest) {
  const origin = request.headers.get('origin');
  return corsHeaders(origin);
}
