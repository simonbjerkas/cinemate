import { Skeleton } from '@/components/ui/skeleton';

import { TMDBMovie } from '@/lib/types';

export function MovieDetails({ movie }: { movie?: TMDBMovie }) {
  if (!movie) {
    return <MovieDetailsSkeleton />;
  }

  return (
    <div className="md:col-span-2">
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Overview</h2>
        <p>{movie.overview}</p>
      </section>
    </div>
  );
}

function MovieDetailsSkeleton() {
  return (
    <div className="md:col-span-2">
      <section className="mb-8">
        <Skeleton className="mb-4 h-8 w-32" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </section>
    </div>
  );
}
