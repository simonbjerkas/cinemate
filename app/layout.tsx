import './globals.css';

import { Geist, Geist_Mono } from 'next/font/google';

import { Header } from './header';
import { Footer } from './footer';
import { Providers } from './providers';

import { cn } from '@/lib/utils';

import type { Metadata } from 'next';
import { ConvexAuthNextjsServerProvider } from '@convex-dev/auth/nextjs/server';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Cinemate',
  description: 'Cinemate is a platform for discovering and sharing movies',
  icons: {
    icon: '/convex.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(geistSans.variable, geistMono.variable, 'antialiased')}>
          <Providers>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="container mx-auto flex-1">{children}</main>
              <Footer />
            </div>
          </Providers>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
