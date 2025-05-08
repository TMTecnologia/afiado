import { httpAction, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { z } from "zod";

export const addEmailToWaitlist = internalMutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const email = await ctx.db
      .query("waitlist")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    // If the email is already in the waitlist, early return
    if (email) {
      return;
    }

    await ctx.db.insert("waitlist", { email: args.email });
  },
});

/**
 * HTTP response status codes
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status}
 */
const HTTP_STATUS_CODE = {
  CREATED: 201,
  UNPROCESSABLE_CONTENT: 422,
};

const waitlistSchema = z.object({
  email: z.string().email("Invalid email format"),
});

export const addEmailToWaitlistHttp = httpAction(async (ctx, request) => {
  const args = await request.json().catch(() => {
    return new Response(
      JSON.stringify({ message: "Invalid input: email required" }),
      {
        status: HTTP_STATUS_CODE.UNPROCESSABLE_CONTENT,
        headers: { "Content-Type": "application/json" },
      },
    );
  });

  const result = waitlistSchema.safeParse(args);
  
  if (!result.success) {
    return new Response(
      JSON.stringify({ 
        message: "Invalid input", 
        errors: result.error.errors 
      }),
      {
        status: HTTP_STATUS_CODE.UNPROCESSABLE_CONTENT,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  await ctx.runMutation(internal.waitlist.addEmailToWaitlist, {
    email: result.data.email,
  });

  return new Response(null, {
    status: HTTP_STATUS_CODE.CREATED,
  });
});
