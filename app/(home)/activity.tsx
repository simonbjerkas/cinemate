'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import Image from 'next/image';

export function ActivitySection() {
  const recent = useQuery(api.entries.recent);

  if (!recent) {
    return <ActivitySkeleton />;
  }

  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-bold">Recent Activity</h2>
      <div className="flex flex-col gap-4">
        {recent.map(activity => (
          <Card key={activity._id}>
            <CardHeader>
              <Image
                src={`https://image.tmdb.org/t/p/original/${activity.movie_poster}`}
                alt={activity.movie_title ?? ''}
                width={100}
                height={100}
              />
              <CardTitle>{activity.movie_title}</CardTitle>
              <CardDescription>{activity._creationTime.toLocaleString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{activity.review}</p>
              <p>{activity.rating}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function ActivitySkeleton() {
  return (
    <section className="mb-12">
      <Skeleton className="mb-6 h-8 w-48" />
      <div className="flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="mb-2 h-6 w-3/4" />
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="h-4 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
