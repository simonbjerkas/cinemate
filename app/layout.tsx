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
    icon: '/cinemate.svg',
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
              <div className="relative flex-1">
                <div className="from-background via-background/95 to-background/90 absolute inset-0 -z-10 bg-gradient-to-b">
                  <div className="bg-primary/15 absolute -top-1/4 -left-1/4 h-[55%] w-[55%] rounded-full blur-3xl" />
                  <div className="bg-secondary/15 absolute -right-1/4 -bottom-1/12 h-[55%] w-[55%] rounded-full blur-3xl" />
                </div>
                <main className="container mx-auto h-full">{children}</main>
              </div>
              <Footer />
            </div>
          </Providers>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
