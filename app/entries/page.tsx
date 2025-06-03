'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { api } from '@/convex/_generated/api';

import { useQuery } from 'convex/react';

import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Watched Movies',
  description: 'Your watched movies',
};

export default function EntriesPage() {
  const entries = useQuery(api.entries.getEntries);
  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold">Entries</h1>
      <p className="text-muted-foreground text-sm">Your watched movies</p>
      <div className="my-4 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {entries?.map(entry => (
          <Card
            key={entry._id}
            className="relative aspect-[2/3] overflow-hidden transition-all duration-300 hover:scale-105"
          >
            <Image
              src={`https://image.tmdb.org/t/p/original/${entry.movie_poster}`}
              alt={entry.movie_title ?? ''}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />

            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

            <div className="z-10 inline-flex h-full flex-col justify-end gap-2">
              <CardHeader>
                <CardTitle className="text-white">{entry.movie_title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href={`/movies/${entry.movie_external_id}`}>View Details</Link>
                </Button>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
