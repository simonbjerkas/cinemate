'use client';

import { EditorDiv } from '@/components/text-editor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';

export function MovieActivity({ movieId }: { movieId: number }) {
  const activity = useQuery(api.entries.entriesByMovieAndUser, {
    external_id: movieId,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your personal activity for this movie.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row gap-2 text-sm">
        {activity?.map((entry, idx) => (
          <div key={entry._id} className="flex flex-row gap-6">
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
