'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';

import { getMainMovies } from '@/lib/api';
import { cn } from '@/lib/utils';

import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export function CarouselSection() {
  const { data: movies } = useQuery({
    queryKey: ['main-movies'],
    queryFn: () => getMainMovies(),
  });

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (!movies) {
    return <LoadingSkeleton />;
  }

  return (
    <section className="container mx-auto mb-12">
      <Carousel
        setApi={setApi}
        className="overflow-hidden rounded-xl"
        plugins={[Autoplay({ delay: 10000 })]}
        opts={{ loop: true }}
      >
        <CarouselContent>
          {movies.map(movie => (
            <CarouselItem key={movie.id} className="relative h-[60vh]">
              <Image
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                alt={movie.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="absolute right-0 bottom-0 left-0 p-12">
                  <h1 className="mb-4 text-4xl font-bold text-white">{movie.title}</h1>
                  <p className="mb-6 max-w-2xl text-lg text-gray-200">{movie.overview}</p>
                  <Button asChild size="lg">
                    <Link href={`/movies/${movie.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mt-3 flex justify-center gap-4">
        {Array.from({ length: count }).map((_, index) => (
          <Button
            aria-label={`Go to slide ${index + 1}`}
            key={index}
            variant="ghost"
            size="icon"
            className={cn('size-4', current === index + 1 ? 'bg-primary' : 'bg-white')}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </section>
  );
}

function LoadingSkeleton() {
  return (
    <div className="py-8">
      <Skeleton className="mb-12 h-[60vh] w-full rounded-xl" />
    </div>
  );
}
