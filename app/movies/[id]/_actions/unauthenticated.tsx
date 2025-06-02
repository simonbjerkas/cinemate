import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import Link from 'next/link';

export function UnauthenticatedMovieActions({ id }: { id: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button className="w-full" asChild>
          <Link href={`/signin?redirect=/movies/${id}`}>Login to add to watchlist</Link>
        </Button>
        <Button className="w-full" variant="secondary" asChild>
          <Link href={`/signin?redirect=/movies/${id}&review=true`}>Login to write a review</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
