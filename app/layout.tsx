import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";

import { Header } from "@/app/header";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { ThemeProvider } from "@/components/theme-provider";

import type { Metadata } from "next";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { cn } from "@/lib/utils";
import { Footer } from "./footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cinemate",
  description: "Cinemate is a platform for discovering and sharing movies",
  icons: {
    icon: "/convex.svg",
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
        <body
          className={cn(geistSans.variable, geistMono.variable, "antialiased")}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ConvexClientProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 container mx-auto">{children}</main>
                <Footer />
              </div>
            </ConvexClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
