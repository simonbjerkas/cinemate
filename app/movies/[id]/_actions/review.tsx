'use client';

import { Button } from '@/components/ui/button';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

import { useAppForm } from '@/hooks/form';
import { useModifySearchParams } from '@/hooks/search-params';
import { useScreen } from '@/hooks/screen';
import { useMutation } from 'convex/react';
import { useEffect, useState } from 'react';

import { api } from '@/convex/_generated/api';
import { Movie } from '@/lib/types';

export function ReviewAction({ movie, review }: { movie: Movie; review?: boolean }) {
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
      await addEntry({ ...movie, rating: value.rating, review: value.review })
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
            <div className="flex min-h-80 flex-1 flex-col gap-2 px-4">
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
