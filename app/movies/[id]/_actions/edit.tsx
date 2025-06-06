'use client';

import { Button } from '@/components/ui/button';
import { ReviewForm } from './review';

import { PencilIcon } from 'lucide-react';

import { api } from '@/convex/_generated/api';
import { Entry } from '@/lib/types';

import { useMutation } from 'convex/react';
import { useState } from 'react';

export function EditAction({
  entry,
  movieTitle,
  defaultValues,
}: {
  entry: Entry;
  movieTitle: string;
  defaultValues: { rating: number; review: string };
}) {
  const [open, setOpen] = useState(false);
  const updateEntry = useMutation(api.entries.updateEntry);

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
