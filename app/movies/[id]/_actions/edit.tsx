'use client';

import { Button } from '@/components/ui/button';
import { ReviewForm } from './review';

import { PencilIcon } from 'lucide-react';

import { api } from '@/convex/_generated/api';
import { Entry } from '@/lib/types';

import { useMutation } from 'convex/react';
import { useState } from 'react';
import { Id } from '@/convex/_generated/dataModel';

export function EditAction({
  entry,
  userId,
  movieTitle,
  defaultValues,
}: {
  entry: Entry;
  userId: Id<'users'>;
  movieTitle: string;
  defaultValues: { rating: number; review: string };
}) {
  const [open, setOpen] = useState(false);
  const updateEntry = useMutation(api.entries.updateEntry);

  if (userId !== entry.user_id) {
    return null;
  }

  const handleSubmit = async (args: { rating: number; review: string }) => {
    await updateEntry({ id: entry._id, ...args });
  };

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
        <PencilIcon className="size-4" />
      </Button>
      <ReviewForm
        open={open}
        setOpen={setOpen}
        movieTitle={movieTitle}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      />
    </>
  );
}
