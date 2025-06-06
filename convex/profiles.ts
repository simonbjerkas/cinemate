import { internalQuery } from './_generated/server';
import { v } from 'convex/values';
import { authenticatedMutation, authenticatedQuery } from './util';

export const getProfileByExternalId = internalQuery({
  args: {
    externalId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('profiles')
      .withIndex('external_id', q => q.eq('external_id', args.externalId))
      .unique();
  },
});

export const getProfile = authenticatedQuery({
  handler: async ctx => {
    return ctx.profile;
  },
});

export const updateProfile = authenticatedMutation({
  args: {
    data: v.object({
      name: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(ctx.profile._id, args.data);
  },
});
