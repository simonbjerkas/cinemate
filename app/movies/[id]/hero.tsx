import { Skeleton } from '@/components/ui/skeleton';

import { TMDBMovie } from '@/lib/types';

import Image from 'next/image';

export function HeroSection({ movie }: { movie?: TMDBMovie }) {
  if (!movie) {
    return <HeroSkeleton />;
  }

  return (
    <section className="relative mb-8 h-[50vh] overflow-hidden rounded-xl">
      <Image
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        <div className="absolute right-0 bottom-0 left-0 p-8">
          <div className="flex items-end gap-8">
            <div className="relative h-48 w-32 flex-shrink-0 overflow-hidden rounded-lg">
              <Image
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="mb-2 text-4xl font-bold text-white">
                {movie.title} ({movie.release_date.split('-')[0]})
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroSkeleton() {
  return (
    <section className="relative mb-8 h-[50vh] overflow-hidden rounded-xl">
      <Skeleton className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        <div className="absolute right-0 bottom-0 left-0 p-8">
          <div className="flex items-end gap-8">
            <Skeleton className="h-48 w-32 flex-shrink-0 rounded-lg" />
            <div className="flex-1">
              <Skeleton className="mb-2 h-8 w-64" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
