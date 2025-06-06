import sanitizeHtml from 'sanitize-html';

import { v } from 'convex/values';
import { getAuthUserId } from '@convex-dev/auth/server';
import { mutation, query } from './_generated/server';
import { internal } from './_generated/api';
import { Id } from './_generated/dataModel';

export const recent = query({
  args: {},
  handler: async ctx => {
    const entries = await ctx.db.query('movie_entries').order('desc').take(6);
    return Promise.all(
      entries.map(async entry => {
        const [movie, user] = await Promise.all([ctx.db.get(entry.movie_id), ctx.db.get(entry.user_id)]);
        return {
          ...entry,
          movie_title: movie?.title,
          movie_poster: movie?.poster_path,
          movie_external_id: movie?.external_id,
          user_name: user?.name,
        };
      }),
    );
  },
});

export const add = mutation({
  args: {
    external_id: v.number(),
    title: v.string(),
    poster_path: v.optional(v.string()),
    release_date: v.optional(v.string()),
    review: v.string(),
    rating: v.number(),
  },
  handler: async (ctx, args): Promise<Id<'movie_entries'>> => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error('User not authenticated');
    }
    const movie = await ctx.runMutation(internal.movies.getOrAddMovie, {
      movie: {
        external_id: args.external_id,
        title: args.title,
        poster_path: args.poster_path,
        release_date: args.release_date,
        last_updated: Date.now().toString(),
      },
    });

    return await ctx.db.insert('movie_entries', {
      user_id: userId,
      movie_id: movie._id,
      review: args.review,
      rating: args.rating,
    });
  },
});

export const updateEntry = mutation({
  args: {
    id: v.id('movie_entries'),
    review: v.string(),
    rating: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error('User not authenticated');
    }
    const entry = await ctx.db.get(args.id);
    if (!entry) {
      throw new Error('Entry not found');
    }
    if (entry.user_id !== userId) {
      throw new Error('User does not have permission to update this entry');
    }

    const sanitizedReview = sanitizeHtml(args.review);

    return await ctx.db.patch(args.id, {
      review: sanitizedReview,
      rating: args.rating,
    });
  },
});

export const deleteEntry = mutation({
  args: {
    id: v.id('movie_entries'),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error('User not authenticated');
    }
    const entry = await ctx.db.get(args.id);
    if (!entry) {
      throw new Error('Entry not found');
    }
    if (entry.user_id !== userId) {
      throw new Error('User does not have permission to delete this entry');
    }
    return await ctx.db.delete(args.id);
  },
});

export const entriesByMovieAndUser = query({
  args: {
    external_id: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    const movie = await ctx.db
      .query('movies')
      .withIndex('by_external_id', q => q.eq('external_id', args.external_id))
      .first();
    if (!movie) {
      return [];
    }
    return ctx.db
      .query('movie_entries')
      .withIndex('by_movie_id_and_user_id', q => q.eq('movie_id', movie._id).eq('user_id', userId))
      .order('desc')
      .collect();
  },
});

export const getEntries = query({
  args: {},
  handler: async ctx => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }
    const entries = await ctx.db
      .query('movie_entries')
      .withIndex('by_user_id', q => q.eq('user_id', userId))
      .order('desc')
      .collect();

    return Promise.all(
      entries.map(async entry => {
        const movie = await ctx.db.get(entry.movie_id);
        return {
          ...entry,
          movie_title: movie?.title,
          movie_poster: movie?.poster_path,
          movie_external_id: movie?.external_id,
        };
      }),
    );
  },
});
