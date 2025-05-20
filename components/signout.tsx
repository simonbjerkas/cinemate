"use client";

import { Button } from "./ui/button";

import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";

export function SignOutButton() {
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
