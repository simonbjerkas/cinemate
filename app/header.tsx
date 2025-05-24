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

import { useConvexAuth, useQuery } from 'convex/react';
import Link from 'next/link';
import { api } from '@/convex/_generated/api';
import { Skeleton } from '@/components/ui/skeleton';
import Search from './search';

export function Header() {
  return (
    <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-primary text-2xl font-bold">Cinemate</span>
        </Link>
        <div className="relative mx-4 max-w-xl flex-1">
          <Search />
        </div>
        <Navbar />
        <Profile />
      </div>
    </header>
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
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
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
          <Skeleton className="h-10 w-10 rounded-full" />
        )
      ) : (
        <SignInButton />
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
    label: 'Lists',
    href: '/lists',
  },
  {
    label: 'People',
    href: '/people',
  },
];

function Navbar() {
  return (
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
  );
}
