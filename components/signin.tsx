import { Button } from '@/components/ui/button';

import Link from 'next/link';

export function SignInButton(props: React.ComponentProps<typeof Button>) {
  return (
    <Button variant="link" asChild {...props}>
      <Link href="/signin">Sign In</Link>
    </Button>
  );
}
