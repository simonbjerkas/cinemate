import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  profiles: defineTable({
    name: v.optional(v.string()),
    external_id: v.string(),
    provider_locale: v.optional(v.array(v.string())),
  }).index('external_id', ['external_id']),

  movies: defineTable({
    title: v.string(),
    poster_path: v.optional(v.string()),
    release_date: v.optional(v.string()),
    external_id: v.number(),
    last_updated: v.string(),
  }).index('by_external_id', ['external_id']),

  movie_entries: defineTable({
    movie_id: v.id('movies'),
    profile_id: v.id('profiles'),
    rating: v.optional(v.number()),
    review: v.optional(v.string()),
    updated_at: v.optional(v.string()),
  })
    .index('by_movie_id', ['movie_id'])
    .index('by_profile_id', ['profile_id'])
    .index('by_movie_id_and_profile_id', ['movie_id', 'profile_id']),

  watchlist: defineTable({
    profile_id: v.id('profiles'),
    updated_at: v.string(),
  }).index('by_profile_id', ['profile_id']),

  watchlist_items: defineTable({
    watchlist_id: v.id('watchlist'),
    movie_id: v.id('movies'),
  }).index('by_watchlist_id', ['watchlist_id']),
});
