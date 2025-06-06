import { Button } from '@/components/ui/button';

import Link from 'next/link';

export function SignInButton(props: React.ComponentProps<typeof Button>) {
  return (
    <Button variant="link" asChild {...props}>
      <Link href="/api/login">Sign In</Link>
    </Button>
  );
}
