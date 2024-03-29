import { mutation, query } from "./_generated/server";

export const getFeaturedArtist = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("featured_artist").collect();
  },
});

export const updateFeaturedArtist = mutation(
  async (
    { db },
    {
      featuredArtistName,
      name,
      socials,
      image,
    }: {
      featuredArtistName: string;
      name: string;
      socials: string[];
      image: string | undefined;
    }
  ) => {
    const document = await db
      .query("featured_artist")
      .filter((q) => q.eq(q.field("name"), featuredArtistName))
      .first();

    if (!document) return;

    document.name = name;
    document.socials = socials;
    document.image = image;

    await db.replace(document._id, document);
  }
);
