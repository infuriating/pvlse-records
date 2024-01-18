import { query } from "./_generated/server";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("track").collect();
  },
});

export const getLatestFour = query({
  args: {},
  handler: async (ctx) => {
    const tasks = await ctx.db.query("track").order("desc").take(4);
    return tasks;
  },
});
