"use client";

import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 bg-background p-4 border-b-2 border-slate-200 dark:border-slate-800 flex flex-row justify-between items-center">
        Convex + Next.js + Convex Auth
        <SignOutButton />
      </header>
      <main className="p-8 flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-center">
          Convex + Next.js + Convex Auth
        </h1>
        <div className="flex flex-col gap-4">hei</div>
      </main>
    </>
  );
}

function SignOutButton() {
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();
  return (
    <>
      {isAuthenticated && (
        <Button
          variant="outline"
          onClick={() =>
            void signOut().then(() => {
              redirect("/signin");
            })
          }
        >
          Sign out
        </Button>
      )}
    </>
  );
}
