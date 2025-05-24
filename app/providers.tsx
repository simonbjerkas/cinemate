'use client';

import { ConvexClientProvider } from '@/components/convex-client-provider';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
