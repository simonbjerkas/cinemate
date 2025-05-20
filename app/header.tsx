"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenu,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { SignOutButton } from "@/components/signout";
import { SignInButton } from "@/components/signin";

import { useConvexAuth } from "convex/react";
import Link from "next/link";

export function Header() {
  return (
    <header className="py-4 ">
      <div className="container mx-auto flex flex-row justify-between items-center">
        <h1>Cinemate</h1>
        <Navbar />
        <Profile />
      </div>
    </header>
  );
}

function Profile() {
  const { isAuthenticated } = useConvexAuth();
  return (
    <div>
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Name</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SignOutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <SignInButton />
      )}
    </div>
  );
}
const LINKS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
];

function Navbar() {
  const { isAuthenticated } = useConvexAuth();
  return (
    <nav className="flex flex-row justify-between items-center">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        shadcn/ui
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Beautifully designed components that you can copy and
                        paste into your apps. Accessible. Customizable. Open
                        Source.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent></NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Documentation
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      {isAuthenticated && <SignOutButton />}
    </nav>
  );
}
