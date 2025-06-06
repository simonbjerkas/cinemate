import { WatchlistMovies } from './movies';
import { withAuth } from '@workos-inc/authkit-nextjs';

export default async function WatchlistPage() {
  await withAuth({ ensureSignedIn: true });

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold">Watchlist</h1>
      <p className="text-muted-foreground text-sm">Your saved movies</p>
      <WatchlistMovies />
    </div>
  );
}
