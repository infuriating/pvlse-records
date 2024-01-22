import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("track").collect();
  },
});

export const getTrack = query({
  args: {
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const track = await ctx.db
      .query("track")
      .filter((q) => q.eq(q.field("title"), args.title))
      .first();

    return track;
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
    genre: v.string(),
    coverImage: v.optional(v.string()),
    url: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const track = await ctx.db.insert("track", {
      artists: args.artists,
      title: args.title,
      genre: args.genre,
      coverImage: args.coverImage,
      url: args.url,
    });

    return track;
  },
});

export const editTrack = mutation(
  async (
    { db },
    {
      trackTitle,
      artists,
      title,
      genre,
      coverImage,
      url,
    }: {
      trackTitle: string;
      artists: string[];
      title: string;
      genre: string;
      coverImage: string | undefined;
      url: string | undefined;
    }
  ) => {
    const document = await db
      .query("track")
      .filter((q) => q.eq(q.field("title"), trackTitle))
      .first();

    if (!document) return;

    document.artists = artists;
    document.title = title;
    document.genre = genre;
    document.coverImage = coverImage;
    document.url = url;

    await db.replace(document._id, document);
  }
);

export const deleteTrack = mutation(
  async ({ db }, { title }: { title: string }) => {
    const document = await db
      .query("track")
      .filter((q) => q.eq(q.field("title"), title))
      .first();

    if (!document) return;

    await db.delete(document._id);
  }
);
