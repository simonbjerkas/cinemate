import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Your profile',
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <div className="py-8">{children}</div>;
}
