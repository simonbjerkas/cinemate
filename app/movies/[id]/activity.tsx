'use client';

import { EditorDiv } from '@/components/text-editor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { EditAction } from './_actions/edit';

export function MovieActivity({ movieId, movieTitle }: { movieId: number; movieTitle: string }) {
  const activity = useQuery(api.entries.entriesByMovieAndUser, {
    external_id: movieId,
  });
  const user = useQuery(api.users.getUser);

  if (!activity || activity.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your personal activity for this movie.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row gap-2 text-sm">
        {activity.map((entry, idx) => (
          <div key={entry._id} className="flex flex-row gap-6">
            {user?._id === entry.user_id ? (
              <EditAction
                entry={entry}
                userId={user._id}
                movieTitle={movieTitle}
                defaultValues={{ rating: entry.rating || 0, review: entry.review || '' }}
              />
            ) : null}
            <div className="flex flex-col gap-2">
              <p className="flex flex-row gap-2">
                <span className="font-bold">{entry.rating}</span>
                <span className="text-muted-foreground">out of 5</span>
              </p>
              <EditorDiv>{entry.review}</EditorDiv>
            </div>
            {idx !== activity.length - 1 && <Separator orientation="vertical" className="mr-6" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
