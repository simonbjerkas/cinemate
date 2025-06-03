import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Watchlist',
  description: 'Your saved movies',
};

export default function WatchlistLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
