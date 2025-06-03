import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Cinemate',
    short_name: 'Cinemate',
    description: 'Cinemate is a platform for discovering and sharing movies',
    start_url: '/',
    display: 'standalone',
    background_color: '#f4e7e1',
    theme_color: '#f4e7e1',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
