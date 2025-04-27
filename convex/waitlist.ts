import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const addEntry = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("waitlist", { email: args.email });
    return newTaskId;
  },
});
