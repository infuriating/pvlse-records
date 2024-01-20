import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  artist: defineTable({
    description: v.string(),
    image: v.optional(v.string()),
    name: v.string(),
    socials: v.array(v.string()),
    spotifyURL: v.optional(v.string()),
  }),
  player_track: defineTable({
    artists: v.array(v.string()),
    coverImage: v.optional(v.string()),
    filePath: v.string(),
    genre: v.string(),
    title: v.string(),
  }),
  track: defineTable({
    artists: v.array(v.string()),
    coverImage: v.optional(v.string()),
    url: v.optional(v.string()),
    genre: v.string(),
    title: v.string(),
  }),
  featured_artist: defineTable({
    image: v.optional(v.string()),
    name: v.string(),
    socials: v.array(v.string()),
  }),
});
