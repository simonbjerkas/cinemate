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
import { TextEditor } from '@/components/text-editor';

import { Movie, TMDBMovie } from '@/lib/types';
import { transformMovie } from '@/lib/utils';
import { api } from '@/convex/_generated/api';

import { useMutation, useQuery } from 'convex/react';
import { useScreen } from '@/hooks/screen';
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

export function MovieActions({ id, movie }: { id: number; movie?: TMDBMovie }) {
  const addToWatchlist = useMutation(api.watchlist.add);
  const removeFromWatchlist = useMutation(api.watchlist.remove);
  const inWatchlist = useQuery(api.watchlist.inWatchlist, {
    externalId: id,
  });

  const handleWatchlist = async (details?: Movie) => {
    if (!details) {
      return;
    }
    switch (inWatchlist) {
      case true:
        return removeFromWatchlist({ externalId: Number(id) }).catch(e => {
          console.error(e);
        });
      case false:
        return addToWatchlist(details).catch(e => {
          console.error(e);
        });
      default:
        return;
    }
  };

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
        <ReviewAction movie={movie} />
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

function ReviewAction({ movie }: { movie: TMDBMovie }) {
  const addEntry = useMutation(api.entries.add);
  const { isMobile } = useScreen();

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="secondary" className="w-full">
            Write a Review
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-full">
          <div className="mx-auto flex h-full w-full max-w-2xl flex-col">
            <DrawerHeader>
              <DrawerTitle>Write a Review</DrawerTitle>
              <DrawerDescription>Write a review for {movie.title}</DrawerDescription>
            </DrawerHeader>
            <div className="flex-1 px-4">
              <TextEditor menubar />
            </div>
            <DrawerFooter>
              <Button
                onClick={async () => {
                  const entry = transformMovie(movie);
                  await addEntry({ ...entry, rating: 5, review: 'hei' });
                }}
              >
                Submit
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full">
          Write a Review
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>Write a review for {movie.title}</DialogDescription>
        </DialogHeader>
        <div className="h-96 overflow-x-auto">
          <TextEditor menubar />
        </div>
        <DialogFooter>
          <Button
            onClick={async () => {
              const entry = transformMovie(movie);
              await addEntry({ ...entry, rating: 5, review: 'hei' });
            }}
          >
            Submit
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
