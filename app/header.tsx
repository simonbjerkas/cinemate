'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { SignOutButton } from '@/components/signout';
import { SignInButton } from '@/components/signin';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Cinemate } from '@/components/cinemate';
import { Search } from './search';

import { X as CrossIcon, Menu as HamburgerMenuIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useScreen } from '@/hooks/screen';
import { useEffect, useState } from 'react';

import { api } from '@/convex/_generated/api';
import { useConvexAuth, useQuery } from 'convex/react';
import Link from 'next/link';

export function Header() {
  const { isMobile } = useScreen();
  return (
    <>
      <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Cinemate />
          <div className="relative mx-4 max-w-xl flex-1">
            <Search />
          </div>
          <Navbar />
          <Profile />
        </div>
      </header>
      {isMobile && <MobileNavbar />}
    </>
  );
}

function Profile() {
  const { isAuthenticated } = useConvexAuth();
  const user = useQuery(api.users.getUser);

  return (
    <div>
      {isAuthenticated ? (
        user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-9 rounded-full">
                <Avatar>
                  <AvatarImage src={user.image} />
                  <AvatarFallback>
                    {user.name
                      ?.split(' ')
                      .map(name => name[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/lists">My Lists</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/watchlist">Watchlist</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="my-2 flex justify-center">
                <SignOutButton />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Skeleton className="size-9 rounded-full" />
        )
      ) : (
        <div className="ml-2 hidden md:block">
          <SignInButton />
        </div>
      )}
    </div>
  );
}

const LINKS = [
  {
    label: 'Movies',
    href: '/movies',
  },
  {
    label: 'Watchlist',
    href: '/watchlist',
  },
  {
    label: 'Entries',
    href: '/entries',
  },
];

function Navbar() {
  const { isMobile } = useScreen();
  return (
    <div className="hidden md:block">
      {!isMobile && (
        <nav className="flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              {LINKS.map(link => (
                <NavigationMenuItem key={link.href}>
                  <Link href={link.href} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>{link.label}</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      )}
    </div>
  );
}

function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <>
      <Button
        className="fixed right-4 bottom-4 z-[100] rounded-full shadow-lg"
        variant="default"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="relative block size-4">
          <CrossIcon
            className={cn('absolute inset-0 transition-opacity duration-200', isOpen ? 'opacity-100' : 'opacity-0')}
          />
          <HamburgerMenuIcon
            className={cn('absolute inset-0 transition-opacity duration-200', isOpen ? 'opacity-0' : 'opacity-100')}
          />
        </span>
      </Button>
      <div
        className={cn(
          'from-background/0 via-background/30 to-background/80 fixed inset-0 z-50 bg-gradient-to-b backdrop-blur-3xl',
          'transition-all duration-300',
          isOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0',
        )}
      >
        {isOpen && (
          <NavigationMenu className="mr-12 flex h-screen w-full flex-col">
            <div className="flex-1" />
            <NavigationMenuList className="mb-28 flex w-full flex-col gap-4">
              {LINKS.map(link => (
                <NavigationMenuItem key={link.href} className="w-80">
                  <Link href={link.href} legacyBehavior passHref className="w-full">
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'w-full')}>
                      {link.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem asChild className="w-80">
                <SignInButton className="w-full" />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}
      </div>
    </>
  );
}
