import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  movies: defineTable({
    title: v.string(),
    description: v.string(),
    rating: v.number(),
  }),
});

// interface _  {
//   budget: number;
//   genres: {
//     id: number;
//     name: string;
//   }[];
//   homepage: string | null;
//   imdb_id: string | null;
//   production_companies: {
//     id: number;
//     logo_path: string | null;
//     name: string;
//     origin_country: string;
//   }[];
//   production_countries: {
//     iso_3166_1: string;
//     name: string;
//   }[];
//   revenue: number;
//   runtime: number;
//   spoken_languages: {
//     english_name: string;
//     iso_639_1: string;
//     name: string;
//   }[];
//   status: string;
//   tagline: string | null;
//   backdrop_path: string | null;
//   genre_ids: number[];
//   id: number;
//   original_language: string;
//   original_title: string;
//   overview: string;
//   popularity: number;
//   poster_path: string | null;
//   release_date: string;
//   title: string;
//   video: boolean;
// }
