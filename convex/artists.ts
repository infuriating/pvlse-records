import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("artist").collect();
  },
});

export const getArtist = query({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const artist = await ctx.db
      .query("artist")
      .filter((q) => q.eq(q.field("name"), args.name))
      .first();

    return artist;
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

export const editArtist = mutation(
  async (
    { db },
    {
      artistName,
      name,
      description,
      socials,
      image,
      spotifyURL,
    }: {
      artistName: string;
      name: string;
      description: string;
      socials: string[];
      image: string | undefined;
      spotifyURL: string | undefined;
    }
  ) => {
    console.log(name, description, socials, image, spotifyURL);

    const document = await db
      .query("artist")
      .filter((q) => q.eq(q.field("name"), artistName))
      .first();

    if (!document) return;

    document.name = name;
    document.description = description;
    document.socials = socials;
    document.image = image;
    document.spotifyURL = spotifyURL;

    await db.replace(document._id, document);
  }
);

export const deleteArtist = mutation(
  async ({ db }, { name }: { name: string }) => {
    const document = await db
      .query("artist")
      .filter((q) => q.eq(q.field("name"), name))
      .first();

    if (!document) return;

    await db.delete(document._id);
  }
);
