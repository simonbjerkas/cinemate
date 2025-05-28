import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

import Link from 'next/link';
import Image from 'next/image';
import { Doc } from '@/convex/_generated/dataModel';

export function MovieCard({ movie }: { movie: Omit<Doc<'movies'>, '_id' | '_creationTime' | 'last_updated'> }) {
  return (
    <Card className="relative aspect-[2/3] overflow-hidden transition-all duration-300 hover:scale-105">
      <Image
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt={movie.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
      />

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

      <div className="z-10 inline-flex h-full flex-col justify-end gap-2">
        <CardHeader>
          <CardTitle className="text-white">{movie.title}</CardTitle>
          <CardDescription>{movie.release_date}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href={`/movies/${movie.external_id}`}>View Details</Link>
          </Button>
        </CardContent>
      </div>
    </Card>
  );
}
