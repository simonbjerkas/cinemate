'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

import { getMovieProviders } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';

export function ProvidersSection({ movieId, locale }: { movieId: number; locale: string[] }) {
  const { data: providers, isLoading } = useQuery({
    queryKey: ['movie-providers', movieId],
    queryFn: () => getMovieProviders({ movieId, countries: locale }),
  });

  if (isLoading) {
    return <ProvidersSkeleton />;
  }

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
        {providers?.map((country, index) => (
          <div key={country.locale} className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Availability in {country.locale}</h3>
            <div className="flex flex-wrap gap-4">
              {country.flatrate && country.flatrate.length > 0 ? (
                country.flatrate?.map(provider => (
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
                ))
              ) : (
                <p className="text-muted-foreground text-sm">Not available for streaming</p>
              )}
            </div>
            <Accordion type="multiple">
              <AccordionItem value="buy">
                <AccordionTrigger>Buy</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-4">
                    {country.buy && country.buy.length > 0 ? (
                      country.buy?.map(provider => (
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
                      ))
                    ) : (
                      <p className="text-muted-foreground text-sm">Not available for purchase</p>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="rent">
                <AccordionTrigger>Rent</AccordionTrigger>
                <AccordionContent>
                  {providers?.map(country => (
                    <div key={country.locale}>
                      <h3 className="text-sm font-medium">{country.locale}</h3>
                      <div className="flex flex-wrap gap-4">
                        {country.rent && country.rent.length > 0 ? (
                          country.rent?.map(provider => (
                            <div key={provider.provider_id} className="flex flex-col items-center gap-2">
                              <Link href={country.link} target="_blank">
                                <div className="relative size-16 overflow-hidden rounded-lg">
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
                          ))
                        ) : (
                          <p className="text-muted-foreground text-sm">Not available for rental</p>
                        )}
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            {index !== providers.length - 1 && <Separator className="bg-accent/40 mb-4" />}
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
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-24" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-48" />
          <div className="flex flex-wrap gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <Skeleton className="h-16 w-16 rounded-lg" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
          <div className="mt-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="mt-2 h-10 w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
