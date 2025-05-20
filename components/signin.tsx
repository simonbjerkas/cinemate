import { Button } from "@/components/ui/button";

import Link from "next/link";

export function SignInButton() {
  return (
    <Button variant="link" asChild>
      <Link href="/signin">Sign In</Link>
    </Button>
  );
}
