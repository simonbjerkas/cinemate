'use client';

import { EditorDiv } from '@/components/text-editor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import { api } from '@/convex/_generated/api';
import { EditAction } from './_actions/edit';
import { useConvexQuery } from '@/hooks/convex';

export function MovieActivity({ movieId, movieTitle }: { movieId: number; movieTitle: string }) {
  const { data: profile } = useConvexQuery(api.profiles.getProfile);
  const { data: activity } = useConvexQuery(api.entries.entriesByMovieAndProfile, {
    external_id: movieId,
  });

  if (!activity) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Recent Activity</CardTitle>
        <CardDescription>Your personal activity for {movieTitle}.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 text-sm">
        {activity.length > 0 ? (
          <>
            <div className="mt-4 flex flex-col gap-6">
              <div className="flex flex-row justify-between gap-2">
                <div>
                  <p className="flex flex-row gap-2">
                    <span className="font-bold">{activity[0].rating}</span>
                    <span className="text-muted-foreground">out of 5</span>
                  </p>
                  <EditorDiv>{activity[0].review}</EditorDiv>
                </div>
                {profile?._id === activity[0].profile_id ? (
                  <EditAction
                    entry={activity[0]}
                    movieTitle={movieTitle}
                    defaultValues={{ rating: activity[0].rating || 0, review: activity[0].review || '' }}
                  />
                ) : null}
              </div>
            </div>
            {activity.length > 1 && (
              <>
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
                            {profile?._id === entry.profile_id ? (
                              <EditAction
                                entry={entry}
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
              </>
            )}
          </>
        ) : (
          <p className="text-muted-foreground">You haven&apos;t rated or reviewed this movie yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
