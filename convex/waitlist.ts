import { NoOp } from "convex-helpers/server/customFunctions";
import { zCustomMutation } from "convex-helpers/server/zod";
import { z } from "zod";
import { internal } from "./_generated/api";
import { httpAction, internalMutation } from "./_generated/server";

const zInternalMutation = zCustomMutation(internalMutation, NoOp);

const waitlistSchema = z.object({
  email: z.string().email("Invalid email format"),
});

export const addEmailToWaitlist = zInternalMutation({
  args: waitlistSchema,
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

type ErrorResponse = {
  message: string;
  errors?: Array<{ path: string; message: string }>;
  code: string;
};

const createErrorResponse = (error: ErrorResponse, init?: ResponseInit) => {
  return new Response(JSON.stringify(error), {
    status: HTTP_STATUS_CODE.UNPROCESSABLE_CONTENT,
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
};

export const addEmailToWaitlistHttp = httpAction(async (ctx, request) => {
  let args: z.infer<typeof waitlistSchema> | undefined;

  try {
    args = await request.json();
  } catch (error) {
    return createErrorResponse({
      message: "Invalid JSON payload",
      code: "INVALID_JSON",
      errors: [
        {
          path: "body",
          message: "The request body must be a valid JSON",
        },
      ],
    });
  }

  const result = waitlistSchema.safeParse(args);

  if (!result.success) {
    return createErrorResponse({
      message: "Validation failed",
      code: "VALIDATION_ERROR",
      errors: result.error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      })),
    });
  }

  await ctx.runMutation(internal.waitlist.addEmailToWaitlist, {
    email: result.data.email,
  });

  return new Response(null, {
    status: HTTP_STATUS_CODE.CREATED,
  });
});
