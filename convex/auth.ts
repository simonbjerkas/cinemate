import Google from '@auth/core/providers/google';
import { convexAuth } from '@convex-dev/auth/server';
import { MutationCtx } from './_generated/server';

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Google],
  callbacks: {
    async createOrUpdateUser(ctx: MutationCtx, args) {
      if (args.existingUserId) {
        return args.existingUserId;
      }

      const existingUser = await ctx.db
        .query('users')
        .filter(q => q.eq(q.field('email'), args.profile.email))
        .first();

      if (existingUser) {
        return existingUser._id;
      }

      return await ctx.db.insert('users', {
        email: args.profile.email,
        name: args.profile.name as string | undefined,
        image: args.profile.image as string | undefined,
      });
    },
  },
});
