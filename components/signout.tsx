'use client';

import { Button } from './ui/button';

export function SignOutButton() {
  const isAuthenticated = true;
  return (
    <>
      {isAuthenticated && (
        <Button
          variant="outline"
          onClick={() => {
            console.log('signing out');
            // void signOut().then(() => {
            //   redirect('/signin');
            // })
          }}
        >
          Sign out
        </Button>
      )}
    </>
  );
}
