'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import Image from 'next/image';

export function ActivitySection() {
  const recent = useQuery(api.entries.recent);

  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-bold">Recent Activity</h2>
      <div className="flex flex-col gap-4">
        {recent ? (
          recent.map(activity => (
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
          ))
        ) : (
          <ActivitySkeleton />
        )}
      </div>
    </section>
  );
}

function ActivitySkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index}>
          <CardHeader>
            <Skeleton className="mb-2 h-24 w-full max-w-[100px]" />
            <Skeleton className="mb-2 h-6 w-3/4 max-w-[300px]" />
            <Skeleton className="h-4 w-1/3 max-w-[200px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="mb-2 h-4 w-full max-w-[500px]" />
            <Skeleton className="h-4 w-1/4 max-w-[100px]" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
