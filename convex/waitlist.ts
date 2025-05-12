import { NoOp } from "convex-helpers/server/customFunctions";
import { zCustomMutation } from "convex-helpers/server/zod";
import { z } from "zod";
import { ErrorCodeCatalog, HTTP_STATUS } from "../src/lib/api/constants";
import { emailSchema } from "../src/lib/api/schemas";
import type { ApiResponse } from "../src/lib/api/types";
import { internal } from "./_generated/api";
import { httpAction, internalMutation } from "./_generated/server";

const zInternalMutation = zCustomMutation(internalMutation, NoOp);

/**
 * Schema for validating waitlist requests
 */
export const waitlistSchema = z.object({
  email: emailSchema,
});

/**
 * Adds an email to the waitlist if it doesn't already exist
 */
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
 * Creates an response with the specified details
 */
const createResponse = (
  response: ApiResponse,
  init: ResponseInit & Required<Pick<ResponseInit, "status">>,
) => {
  return new Response(JSON.stringify(response), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
};

/**
 * HTTP endpoint for adding an email to the waitlist
 */
export const addEmailToWaitlistHttp = httpAction(async (ctx, request) => {
  let args: unknown;

  try {
    args = await request.json();
  } catch (error) {
    return createResponse(
      {
        success: false,
        message: ErrorCodeCatalog.INVALID_JSON,
        code: "INVALID_JSON",
        errors: [
          {
            path: "body",
            message: "O corpo da requisição deve ser um JSON válido",
          },
        ],
      },
      {
        status: HTTP_STATUS.UNPROCESSABLE_CONTENT,
      },
    );
  }

  const result = waitlistSchema.safeParse(args);

  if (!result.success) {
    return createResponse(
      {
        success: false,
        message: ErrorCodeCatalog.VALIDATION_ERROR,
        code: "VALIDATION_ERROR",
        errors: result.error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      },
      {
        status: HTTP_STATUS.UNPROCESSABLE_CONTENT,
      },
    );
  }

  await ctx.runMutation(internal.waitlist.addEmailToWaitlist, {
    email: result.data.email,
  });

  return createResponse(
    {
      success: true,
      message: "Email adicionado com sucesso!",
    },
    {
      status: HTTP_STATUS.CREATED,
    },
  );
});
