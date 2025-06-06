'use client';

import { EditorDiv } from '@/components/text-editor';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

import { api } from '@/convex/_generated/api';
import { cn } from '@/lib/utils';
import { useQuery } from 'convex/react';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function ActivitySection() {
  const recent = useQuery(api.entries.recent);

  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-bold">Recent Activity</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recent ? (
          recent.map(activity => (
            <Card className="max-w-xl" key={activity._id}>
              <CardHeader className="flex flex-row gap-4">
                <Link href={`/movies/${activity.movie_external_id}`}>
                  <Image
                    src={`https://image.tmdb.org/t/p/original/${activity.movie_poster}`}
                    alt={activity.movie_title ?? ''}
                    className="w-auto"
                    width={100}
                    height={100}
                  />
                </Link>
                <div className="flex flex-col gap-2">
                  <CardTitle>{activity.movie_title}</CardTitle>
                  <CardDescription>
                    {new Date(activity._creationTime).toLocaleString('en-US', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                      hour12: false,
                    })}
                  </CardDescription>
                </div>
              </CardHeader>
              <Separator className="mx-auto max-w-11/12 opacity-45" />
              <CardContent className="flex flex-col gap-2">
                <EditorDiv>{activity.review}</EditorDiv>
                <p className="flex flex-row gap-1">
                  <span className="sr-only">{activity.rating}</span>
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={cn(
                        'hover:text-primary size-6 transition-colors',
                        star <= (activity.rating ?? 0) ? 'fill-primary text-primary' : 'fill-none',
                      )}
                    />
                  ))}
                </p>
              </CardContent>
              <Separator className="mx-auto max-w-11/12 opacity-45" />
              <CardFooter className="text-muted-foreground text-sm">
                <p>{activity.profile_name}</p>
              </CardFooter>
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
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index} className="max-w-xl">
          <CardHeader className="flex flex-row gap-4">
            <Skeleton className="aspect-[2/3] h-36" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-6 w-3/4 max-w-[300px]" />
              <Skeleton className="h-4 w-1/3 max-w-[200px]" />
            </div>
          </CardHeader>
          <Separator className="mx-auto max-w-11/12 opacity-45" />
          <CardContent className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full max-w-[500px]" />
            <Skeleton className="h-4 w-1/4 max-w-[100px]" />
          </CardContent>
          <Separator className="mx-auto max-w-11/12 opacity-45" />
          <CardFooter className="text-muted-foreground text-sm">
            <Skeleton className="h-4 w-1/4 max-w-[100px]" />
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
