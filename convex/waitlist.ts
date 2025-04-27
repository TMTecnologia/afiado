import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const addEntry = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const email = await ctx.db
      .query("waitlist")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (email) {
      throw new Error("E-mail já cadastrado");
    }

    const newEntry = await ctx.db.insert("waitlist", { email: args.email });
    return newEntry;
  },
});
