'use client';

import { useQuery } from '@tanstack/react-query';
import { getMovieProviders } from '@/lib/api';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

export function ProvidersSection({ movieId }: { movieId: number }) {
  const { data: providers, isLoading } = useQuery({
    queryKey: ['movie-providers', movieId],
    queryFn: () => getMovieProviders({ movieId, countries: ['US'] }),
  });

  if (isLoading) {
    return <ProvidersSkeleton />;
  }

  if (!providers?.length || !providers[0].flatrate?.length) {
    return null;
  }

  console.log(providers);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Where to Stream</CardTitle>
        <CardDescription className="flex items-center gap-2">
          Powered by
          <Link href="https://www.justwatch.com/" target="_blank">
            <Image src="/just-watch.png" alt="JustWatch" width={100} height={100} className="aspect-auto w-24" />
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {providers.map(country => (
          <div key={country.locale} className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">{country.locale}</h3>
            <div className="flex flex-wrap gap-4">
              {country.flatrate?.map(provider => (
                <div key={provider.provider_id} className="flex flex-col items-center gap-2">
                  <Link href={country.link} target="_blank">
                    <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                      <Image
                        src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                        alt={provider.provider_name}
                        fill
                        sizes="100px"
                        className="object-contain"
                      />
                    </div>
                  </Link>
                  <span className="text-muted-foreground text-sm">{provider.provider_name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ProvidersSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Skeleton className="h-16 w-16 rounded-lg" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
