import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("track").collect();
  },
});

export const getLatestFour = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("track").order("desc").take(4);
  },
});

export const addTrack = mutation({
  args: {
    artists: v.array(v.string()),
    title: v.string(),
    coverImage: v.optional(v.string()),
    url: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const track = await ctx.db.insert("track", {
      artists: args.artists,
      title: args.title,
      coverImage: args.coverImage,
      url: args.url,
    });

    return track;
  },
});
