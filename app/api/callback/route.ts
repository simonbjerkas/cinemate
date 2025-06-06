import { handleAuth } from '@workos-inc/authkit-nextjs';

export const GET = handleAuth({
  onSuccess(data) {
    console.log(data);
  },
});
