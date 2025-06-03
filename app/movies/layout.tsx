import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Cinemate',
    default: 'Movies',
  },
  description: 'Popular movies right now',
};

export default function MoviesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
