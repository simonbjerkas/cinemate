import { v } from 'convex/values';
import { internalMutation, query } from './_generated/server';
import { Doc } from './_generated/dataModel';

export const getMovies = query({
  args: {},
  handler: async ctx => {
    const movies = await ctx.db.query('movies').collect();
    return movies;
  },
});

export const getMovie = query({
  args: {
    id: v.id('movies'),
  },
  handler: async (ctx, args) => {
    const movie = await ctx.db.get(args.id);
    return movie;
  },
});

export const getOrAddMovie = internalMutation({
  args: {
    movie: v.object({
      title: v.string(),
      poster_path: v.optional(v.string()),
      release_date: v.string(),
      external_id: v.number(),
      last_updated: v.string(),
    }),
  },
  handler: async (ctx, args): Promise<Doc<'movies'>> => {
    const existingMovie = await ctx.db
      .query('movies')
      .withIndex('by_external_id', q => q.eq('external_id', args.movie.external_id))
      .unique();

    if (existingMovie) {
      return existingMovie;
    }
    const newMovie = await ctx.db.insert('movies', args.movie);
    const insertedMovie = await ctx.db.get(newMovie);
    if (!insertedMovie) {
      throw new Error('Failed to add movie');
    }
    return insertedMovie;
  },
});
