'use client';

import { Button } from '@/components/ui/button';

import { api } from '@/convex/_generated/api';
import { Movie } from '@/lib/types';

import { useMutation, useQuery } from 'convex/react';
import { useCallback } from 'react';

export function WatchlistAction({ movie }: { movie: Movie }) {
  const addToWatchlist = useMutation(api.watchlist.add);
  const removeFromWatchlist = useMutation(api.watchlist.remove);
  const inWatchlist = useQuery(api.watchlist.inWatchlist, {
    externalId: movie.external_id,
  });

  const handleWatchlist = useCallback(
    async (details?: Movie) => {
      if (!details) {
        return;
      }
      if (inWatchlist) {
        return removeFromWatchlist({ externalId: movie.external_id }).catch(e => {
          console.error(e);
        });
      } else {
        return addToWatchlist(details).catch(e => {
          console.error(e);
        });
      }
    },
    [inWatchlist, addToWatchlist, removeFromWatchlist, movie],
  );

  return (
    <Button
      className="w-full"
      variant={inWatchlist ? 'outline' : 'default'}
      onClick={async () => {
        await handleWatchlist(movie);
      }}
    >
      {inWatchlist ? 'Added to Watchlist' : 'Add to Watchlist'}
    </Button>
  );
}
