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
} from '@/components/ui/drawer';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
  const [open, setOpen] = useState(review || false);

  useEffect(() => {
    if (review) {
      removeQueryParam('review');
    }
  }, [review, removeQueryParam]);

  const handleSubmit = async (args: { rating: number; review: string }) => {
    await addEntry({
      title: movie.title,
      external_id: movie.external_id,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      ...args,
    });
  };

  return (
    <>
      <Button variant="secondary" className="w-full" onClick={() => setOpen(true)}>
        Write a Review
      </Button>
      <ReviewForm open={open} setOpen={setOpen} movieTitle={movie.title} onSubmit={handleSubmit} />
    </>
  );
}

interface ReviewFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  movieTitle: string;
  onSubmit: (args: { rating: number; review: string }) => Promise<void>;
  defaultValues?: {
    rating: number;
    review: string;
  };
}

export const ReviewForm = ({ open, setOpen, movieTitle, onSubmit, defaultValues }: ReviewFormProps) => {
  const { isMobile } = useScreen();
  const form = useAppForm({
    defaultValues: {
      rating: defaultValues?.rating || 0,
      review: defaultValues?.review || '',
    },
    onSubmit: async ({ value }) => {
      await onSubmit({
        rating: value.rating,
        review: value.review,
      })
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
        <DrawerContent>
          <form
            className="mx-auto flex w-full max-w-2xl flex-col overflow-y-auto"
            onSubmit={e => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <DrawerHeader>
              <DrawerTitle>Write a Review</DrawerTitle>
              <DrawerDescription>Write a review for {movieTitle}</DrawerDescription>
            </DrawerHeader>
            <div className="flex h-80 flex-col gap-2 px-4">
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
      <DialogContent>
        <form
          className="mx-auto flex w-full max-w-md flex-col gap-4"
          onSubmit={e => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
            <DialogDescription>Write a review for {movieTitle}</DialogDescription>
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
};
