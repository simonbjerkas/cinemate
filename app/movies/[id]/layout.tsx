import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Movie',
  description: 'Movie details',
};

export default function MovieLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
