import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';
import { authTables } from '@convex-dev/auth/server';

export default defineSchema({
  ...authTables,
  movies: defineTable({
    title: v.string(),
    poster_path: v.optional(v.string()),
    release_date: v.optional(v.string()),
    external_id: v.number(),
    last_updated: v.string(),
  }).index('by_external_id', ['external_id']),

  movie_entries: defineTable({
    movie_id: v.id('movies'),
    user_id: v.id('users'),
    rating: v.optional(v.number()),
    review: v.optional(v.string()),
    updated_at: v.optional(v.string()),
  })
    .index('by_movie_id', ['movie_id'])
    .index('by_user_id', ['user_id'])
    .index('by_movie_id_and_user_id', ['movie_id', 'user_id']),

  watchlist: defineTable({
    user_id: v.id('users'),
    updated_at: v.string(),
  }).index('by_user_id', ['user_id']),

  watchlist_items: defineTable({
    watchlist_id: v.id('watchlist'),
    movie_id: v.id('movies'),
  }).index('by_watchlist_id', ['watchlist_id']),
});
