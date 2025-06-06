import './globals.css';

import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { ConvexClientProvider } from '@/components/convex-client-provider';
import { CookieConsent } from '@/components/cookie-consent';

import { Header } from './header';
import { Footer } from './footer';
import { Providers } from './providers';

import { cn } from '@/lib/utils';

import type { Metadata } from 'next';
import { AuthKitProvider } from '@workos-inc/authkit-nextjs/components';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Cinemate',
    default: 'Cinemate',
  },
  description: 'Cinemate is a platform for discovering and sharing movies',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(geistSans.variable, geistMono.variable, 'antialiased')}>
        <AuthKitProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ConvexClientProvider>
              <Providers>
                <div className="flex min-h-screen flex-col">
                  <Header />
                  <main className="container mx-auto flex-1">
                    <div className="mx-3 md:mx-0">{children}</div>
                  </main>
                  <Footer />
                </div>
              </Providers>
              <CookieConsent />
            </ConvexClientProvider>
          </ThemeProvider>
        </AuthKitProvider>
      </body>
    </html>
  );
}
