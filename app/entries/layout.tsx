import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Watched Movies',
  description: 'Your watched movies',
};

export default function EntriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
