'use client';

import { EditorDiv } from '@/components/text-editor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { EditAction } from './_actions/edit';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
        <CardTitle>Your Recent Activity</CardTitle>
        <CardDescription>Your personal activity for {movieTitle}.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 text-sm">
        <div className="mt-4 flex flex-col gap-6">
          <div className="flex flex-row justify-between gap-2">
            <div>
              <p className="flex flex-row gap-2">
                <span className="font-bold">{activity[0].rating}</span>
                <span className="text-muted-foreground">out of 5</span>
              </p>
              <EditorDiv>{activity[0].review}</EditorDiv>
            </div>
            {user?._id === activity[0].user_id ? (
              <EditAction
                entry={activity[0]}
                userId={user._id}
                movieTitle={movieTitle}
                defaultValues={{ rating: activity[0].rating || 0, review: activity[0].review || '' }}
              />
            ) : null}
          </div>
        </div>
        <Separator className="bg-muted" />
        <Accordion type="single" collapsible>
          <AccordionItem value="activity">
            <AccordionTrigger>View all activity</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <Separator className="bg-muted mt-4" />
              {activity.slice(1).map((entry, idx) => (
                <div key={entry._id} className="mt-4 flex flex-col gap-6">
                  <div className="flex flex-row justify-between gap-2">
                    <div>
                      <p className="flex flex-row gap-2">
                        <span className="font-bold">{entry.rating}</span>
                        <span className="text-muted-foreground">out of 5</span>
                      </p>
                      <EditorDiv>{entry.review}</EditorDiv>
                    </div>
                    {user?._id === entry.user_id ? (
                      <EditAction
                        entry={entry}
                        userId={user._id}
                        movieTitle={movieTitle}
                        defaultValues={{ rating: entry.rating || 0, review: entry.review || '' }}
                      />
                    ) : null}
                  </div>
                  {idx !== activity.length - 2 && <Separator className="bg-muted" />}
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
