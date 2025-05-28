import { ConvexError, v } from 'convex/values';
import { internalMutation, internalQuery, mutation, query } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';
import { Doc } from './_generated/dataModel';
import { internal } from './_generated/api';

export const getOrCreateWatchlist = internalMutation({
  args: {
    userId: v.id('users'),
  },
  handler: async (ctx, args): Promise<Doc<'watchlist'>> => {
    const watchlist = await ctx.db
      .query('watchlist')
      .withIndex('by_user_id', q => q.eq('user_id', args.userId))
      .unique();

    if (!watchlist) {
      const newWatchlist = await ctx.db.insert('watchlist', {
        user_id: args.userId,
        updated_at: Date.now().toString(),
      });
      const insertedWatchlist = await ctx.db.get(newWatchlist);
      if (!insertedWatchlist) {
        throw new ConvexError('Failed to create watchlist');
      }
      return insertedWatchlist;
    }

    await ctx.db.patch(watchlist._id, {
      updated_at: Date.now().toString(),
    });
    return watchlist;
  },
});

export const isMovieInWatchlist = internalQuery({
  args: {
    watchlistId: v.id('watchlist'),
    movieId: v.id('movies'),
  },
  handler: async (ctx, args): Promise<boolean> => {
    const existingItem = await ctx.db
      .query('watchlist_items')
      .withIndex('by_watchlist_id', q => q.eq('watchlist_id', args.watchlistId))
      .filter(q => q.eq(q.field('movie_id'), args.movieId))
      .unique();
    return !!existingItem;
  },
});

export const add = mutation({
  args: {
    title: v.string(),
    poster_path: v.optional(v.string()),
    release_date: v.optional(v.string()),
    external_id: v.number(),
  },
  handler: async (ctx, args): Promise<Doc<'watchlist_items'>> => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new ConvexError('User not authenticated');
    }

    const [watchlist, movie] = await Promise.all([
      ctx.runMutation(internal.watchlist.getOrCreateWatchlist, {
        userId,
      }),
      ctx.runMutation(internal.movies.getOrAddMovie, {
        movie: {
          title: args.title,
          poster_path: args.poster_path,
          release_date: args.release_date,
          external_id: args.external_id,
          last_updated: Date.now().toString(),
        },
      }),
    ]);

    const isInWatchlist = await ctx.runQuery(internal.watchlist.isMovieInWatchlist, {
      watchlistId: watchlist._id,
      movieId: movie._id,
    });

    if (isInWatchlist) {
      throw new ConvexError('Movie is already in watchlist');
    }

    const watchlistItem = await ctx.db.insert('watchlist_items', {
      watchlist_id: watchlist._id,
      movie_id: movie._id,
    });
    const insertedItem = await ctx.db.get(watchlistItem);
    if (!insertedItem) {
      throw new ConvexError('Failed to add movie to watchlist');
    }
    return insertedItem;
  },
});

export const inWatchlist = query({
  args: {
    externalId: v.number(),
  },
  handler: async (ctx, args): Promise<boolean> => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return false;
    }

    const [movie, watchlist] = await Promise.all([
      ctx.db
        .query('movies')
        .withIndex('by_external_id', q => q.eq('external_id', args.externalId))
        .unique(),
      ctx.db
        .query('watchlist')
        .withIndex('by_user_id', q => q.eq('user_id', userId))
        .unique(),
    ]);

    if (!watchlist || !movie) {
      return false;
    }

    const isInWatchlist = await ctx.runQuery(internal.watchlist.isMovieInWatchlist, {
      watchlistId: watchlist._id,
      movieId: movie._id,
    });
    return isInWatchlist;
  },
});

export const remove = mutation({
  args: {
    externalId: v.number(),
  },
  handler: async (ctx, args): Promise<void> => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new ConvexError('User not authenticated');
    }

    const [movie, watchlist] = await Promise.all([
      ctx.db
        .query('movies')
        .withIndex('by_external_id', q => q.eq('external_id', args.externalId))
        .unique(),
      ctx.db
        .query('watchlist')
        .withIndex('by_user_id', q => q.eq('user_id', userId))
        .unique(),
    ]);

    if (!watchlist || !movie) {
      throw new ConvexError('Movie or watchlist not found');
    }

    const watchlistItem = await ctx.db
      .query('watchlist_items')
      .withIndex('by_watchlist_id', q => q.eq('watchlist_id', watchlist._id))
      .filter(q => q.eq(q.field('movie_id'), movie._id))
      .unique();

    if (!watchlistItem) {
      throw new ConvexError('Movie is not in watchlist');
    }

    await ctx.db.delete(watchlistItem._id);
  },
});

export const cleanupWatchlist = internalMutation({
  args: {
    watchlistItemIds: v.array(v.id('watchlist_items')),
  },
  handler: async (ctx, args): Promise<void> => {
    await Promise.all(args.watchlistItemIds.map(id => ctx.db.delete(id)));
  },
});

export const getWatchlist = query({
  args: {},
  handler: async (ctx): Promise<Doc<'movies'>[]> => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new ConvexError('User not authenticated');
    }

    const watchlist = await ctx.db
      .query('watchlist')
      .withIndex('by_user_id', q => q.eq('user_id', userId))
      .unique();

    if (!watchlist) {
      return [];
    }

    const watchlistItems = await ctx.db
      .query('watchlist_items')
      .withIndex('by_watchlist_id', q => q.eq('watchlist_id', watchlist._id))
      .collect();

    const movies = await Promise.all(watchlistItems.map(async item => ctx.db.get(item.movie_id)));
    return movies.filter(movie => movie !== null);
  },
});
