import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      {
        hostname: 'image.tmdb.org',
      },
      {
        hostname: 'i.pravatar.cc',
      },
    ],
  },
};

export default nextConfig;
