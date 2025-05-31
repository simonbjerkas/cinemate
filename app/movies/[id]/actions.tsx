'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerClose,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Dialog } from '@/components/ui/dialog';
import { useAppForm } from '@/hooks/form';

import Link from 'next/link';
import { Movie, TMDBMovie } from '@/lib/types';
import { transformMovie } from '@/lib/utils';
import { api } from '@/convex/_generated/api';

import { useMutation, useQuery } from 'convex/react';
import { useScreen } from '@/hooks/screen';
import { useCallback, useEffect, useState } from 'react';
import { useModifySearchParams } from '@/hooks/search-params';

export function MovieActions({ id, movie }: { id: number; movie?: TMDBMovie }) {
  const { searchParams, removeQueryParam } = useModifySearchParams();
  const review = searchParams.get('review');
  const watchlist = searchParams.get('watchlist');

  const addToWatchlist = useMutation(api.watchlist.add);
  const removeFromWatchlist = useMutation(api.watchlist.remove);
  const inWatchlist = useQuery(api.watchlist.inWatchlist, {
    externalId: id,
  });

  const handleWatchlist = useCallback(
    async (details?: Movie) => {
      if (!details) {
        return;
      }
      if (inWatchlist) {
        return removeFromWatchlist({ externalId: Number(id) }).catch(e => {
          console.error(e);
        });
      } else {
        return addToWatchlist(details).catch(e => {
          console.error(e);
        });
      }
    },
    [inWatchlist, addToWatchlist, removeFromWatchlist, id],
  );

  useEffect(() => {
    if (watchlist === 'true' && movie && typeof inWatchlist === 'boolean') {
      if (inWatchlist) {
        removeFromWatchlist({ externalId: Number(id) });
      } else {
        const entry = transformMovie(movie);
        addToWatchlist(entry);
      }
      removeQueryParam('watchlist');
    }
  }, [watchlist, movie, inWatchlist, removeQueryParam, removeFromWatchlist, addToWatchlist, id]);

  if (!movie) {
    return <MovieActionsSkeleton />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button
          className="w-full"
          variant={inWatchlist ? 'outline' : 'default'}
          onClick={async () => {
            const entry = transformMovie(movie);
            await handleWatchlist(entry);
          }}
        >
          {inWatchlist ? 'Added to Watchlist' : 'Add to Watchlist'}
        </Button>
        <ReviewAction movie={movie} review={review === 'true'} />
      </CardContent>
    </Card>
  );
}

export function UnauthenticatedMovieActions({ id }: { id: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button className="w-full" asChild>
          <Link href={`/signin?redirect=/movies/${id}&watchlist=true`}>Login to add to watchlist</Link>
        </Button>
        <Button className="w-full" variant="secondary" asChild>
          <Link href={`/signin?redirect=/movies/${id}&review=true`}>Login to write a review</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function MovieActionsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}

function ReviewAction({ movie, review }: { movie: TMDBMovie; review?: boolean }) {
  const { removeQueryParam } = useModifySearchParams();
  const addEntry = useMutation(api.entries.add);
  const { isMobile } = useScreen();
  const [open, setOpen] = useState(review || false);

  useEffect(() => {
    if (review) {
      removeQueryParam('review');
    }
  }, [review, removeQueryParam]);

  const form = useAppForm({
    defaultValues: {
      rating: 0,
      review: '',
    },
    onSubmit: async ({ value }) => {
      const entry = transformMovie(movie);
      await addEntry({ ...entry, rating: value.rating, review: value.review })
        .then(() => {
          setOpen(false);
        })
        .catch(e => {
          console.error(e);
        });
    },
  });

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="secondary" className="w-full">
            Write a Review
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-full">
          <form
            className="mx-auto flex h-full w-full max-w-2xl flex-col"
            onSubmit={e => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <DrawerHeader>
              <DrawerTitle>Write a Review</DrawerTitle>
              <DrawerDescription>Write a review for {movie.title}</DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-4">
              <form.AppField
                name="rating"
                children={field => {
                  return <field.StarRatingField label="Rating" />;
                }}
              />
              <form.AppField
                name="review"
                children={field => {
                  return <field.TextEditorField label="Review" />;
                }}
              />
            </div>
            <DrawerFooter>
              <form.AppForm>
                <form.SubscribeButton label="Submit" />
              </form.AppForm>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full">
          Write a Review
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          className="flex flex-col gap-4"
          onSubmit={e => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
            <DialogDescription>Write a review for {movie.title}</DialogDescription>
          </DialogHeader>

          <div className="flex h-96 flex-col gap-2">
            <form.AppField
              name="rating"
              children={field => {
                return <field.StarRatingField label="Rating" />;
              }}
            />
            <form.AppField
              name="review"
              children={field => {
                return <field.TextEditorField label="Review" />;
              }}
            />
          </div>
          <DialogFooter>
            <form.AppForm>
              <form.SubscribeButton label="Submit" />
            </form.AppForm>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
