'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/cinemate';

import { useAuthActions } from '@convex-dev/auth/react';
import { useModifySearchParams } from '@/hooks/search-params';

export default function SignIn() {
  const { signIn } = useAuthActions();
  const { searchParams, removeQueryParam } = useModifySearchParams();
  const redirect = searchParams.get('redirect');

  const handleSignIn = () => {
    removeQueryParam('redirect');
    const redirectTo = redirect
      ? redirect + (searchParams.toString() ? '?' + searchParams.toString() : '')
      : '/' + (searchParams.toString() ? '?' + searchParams.toString() : '');
    signIn('google', { redirectTo });
  };

  return (
    <div className="mt-12 mb-12 flex h-full flex-col items-center justify-center md:mb-0">
      <div className="mb-8 flex flex-col items-center gap-2">
        <Logo className="size-16" />
        <h1 className="text-foreground text-4xl font-bold tracking-tight">Welcome to Cinemate</h1>
        <p className="text-muted-foreground">Your personal movie companion</p>
      </div>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Choose your preferred sign in method</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" onClick={handleSignIn} className="w-full">
            <GoogleIcon className="size-5" />
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function GoogleIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
      <path d="M1 1h22v22H1z" fill="none" />
    </svg>
  );
}
