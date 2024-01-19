import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("artist").collect();
  },
});

export const addArtist = mutation({
  args: {
    description: v.string(),
    socials: v.array(v.string()),
    name: v.string(),
    image: v.optional(v.string()),
    spotifyURL: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const artist = await ctx.db.insert("artist", {
      description: args.description,
      socials: args.socials,
      name: args.name,
      image: args.image,
      spotifyURL: args.spotifyURL,
    });

    return artist;
  },
});
