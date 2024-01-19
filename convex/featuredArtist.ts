import { query } from "./_generated/server";

export const getFeaturedArtist = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("featured_artist").collect();
  },
});
