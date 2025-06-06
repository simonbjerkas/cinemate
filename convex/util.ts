import { ConvexError } from 'convex/values';
import { internal } from './_generated/api';
import { Doc } from './_generated/dataModel';
import { ActionCtx, MutationCtx, QueryCtx, mutation, query } from './_generated/server';
import { customCtx, customMutation, customQuery } from 'convex-helpers/server/customFunctions';

import { withAuth } from '@workos-inc/authkit-nextjs';

const authCheck = async (ctx: QueryCtx | MutationCtx | ActionCtx): Promise<Doc<'profiles'>> => {
  const { user } = await withAuth();
  if (!user) {
    throw new ConvexError('User not authenticated');
  }
  const profile: Doc<'profiles'> | null = await ctx.runQuery(internal.profiles.getProfileByExternalId, {
    externalId: user.id,
  });
  if (!profile) {
    throw new ConvexError('Profile not found');
  }
  return profile;
};

export const authenticatedQuery = customQuery(
  query,
  customCtx(async (ctx): Promise<{ profile: Doc<'profiles'> }> => {
    const profile = await authCheck(ctx);
    return { profile };
  }),
);

export const authenticatedMutation = customMutation(
  mutation,
  customCtx(async (ctx): Promise<{ profile: Doc<'profiles'> }> => {
    const profile = await authCheck(ctx);
    return { profile };
  }),
);
