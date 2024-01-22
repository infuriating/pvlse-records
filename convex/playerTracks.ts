import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("player_track").collect();
  },
});

export const addPlayerTrack = mutation({
  args: {
    artists: v.array(v.string()),
    coverImage: v.optional(v.string()),
    filePath: v.string(),
    genre: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const playerTrack = await ctx.db.insert("player_track", {
      artists: args.artists,
      coverImage: args.coverImage,
      filePath: args.filePath,
      genre: args.genre,
      title: args.title,
    });

    return playerTrack;
  },
});

export const getPlayerTrack = query({
  args: { title: v.string() },
  handler: async (ctx, args) => {
    const document = await ctx.db
      .query("player_track")
      .filter((q) => q.eq(q.field("title"), args.title))
      .first();

    if (!document) return;

    return document;
  },
});

export const editPlayerTrack = mutation(
  async (
    { db },
    {
      playerTrackTitle,
      artists,
      coverImage,
      filePath,
      genre,
      title,
    }: {
      playerTrackTitle: string;
      artists: string[];
      coverImage: string | undefined;
      filePath: string;
      genre: string;
      title: string;
    }
  ) => {
    const document = await db
      .query("player_track")
      .filter((q) => q.eq(q.field("title"), playerTrackTitle))
      .first();

    if (!document) return;

    document.artists = artists;
    document.coverImage = coverImage;
    document.filePath = filePath;
    document.genre = genre;
    document.title = title;

    await db.replace(document._id, document);
  }
);

export const deletePlayerTrack = mutation(
  async ({ db }, { title }: { title: string }) => {
    const document = await db
      .query("player_track")
      .filter((q) => q.eq(q.field("title"), title))
      .first();

    if (!document) return;

    await db.delete(document._id);
  }
);
