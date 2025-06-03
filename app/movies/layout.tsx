import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Movies',
  description: 'Popular movies right now',
};

export default function MoviesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
