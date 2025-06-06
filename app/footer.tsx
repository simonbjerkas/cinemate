import { Cinemate } from '@/components/cinemate';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-border bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Cinemate size="sm" variant="small" className="mb-4" />
            <p className="text-muted-foreground text-sm">
              Your personal movie companion. Track, rate, and discover films with fellow movie enthusiasts.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Discover</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/movies" className="text-muted-foreground hover:text-primary">
                  Movies
                </Link>
              </li>
              <li>
                <Link href="/lists" className="text-muted-foreground hover:text-primary">
                  Lists
                </Link>
              </li>
              <li>
                <Link href="/people" className="text-muted-foreground hover:text-primary">
                  People
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Account</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/profile" className="text-muted-foreground hover:text-primary">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/lists" className="text-muted-foreground hover:text-primary">
                  My Lists
                </Link>
              </li>
              <li>
                <Link href="/watchlist" className="text-muted-foreground hover:text-primary">
                  Watchlist
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-border text-muted-foreground mt-8 border-t pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} Cinemate. All rights reserved.</p>
          <p className="mt-2">
            Powered by{' '}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              TMDB
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
