import { HOUR, MINUTE, RateLimiter } from "@convex-dev/rate-limiter";
import { NoOp } from "convex-helpers/server/customFunctions";
import { zCustomMutation } from "convex-helpers/server/zod";
import { z } from "zod";
import { ErrorCodeCatalog, HTTP_STATUS } from "~/lib/api/constants";
import { emailSchema } from "~/lib/api/schemas";
import type { ApiResponse } from "~/lib/api/types";
import { internal } from "./_generated/api";
import { components } from "./_generated/api";
import { httpAction, internalMutation } from "./_generated/server";

const zInternalMutation = zCustomMutation(internalMutation, NoOp);

/**
 * Rate limit configuration for the waitlist signup endpoint
 * @constant
 */
const WAITLIST_RATE_LIMIT = {
  /** Algorithm used to calculate the rate limiting */
  ALGORITHM: "fixed window",
  /** Maximum number of requests allowed in the time window */
  REQUESTS_PER_WINDOW: 10,
  /** Time window duration in milliseconds */
  WINDOW_DURATION: MINUTE,
  /** Maximum burst capacity */
  BURST_CAPACITY: 3,
} as const;

/**
 * Rate limiter instance for managing request limits
 */
const rateLimiter = new RateLimiter(components.rateLimiter);

/**
 * Creates rate limit headers for the response
 */
const createRateLimitHeaders = (
  /** The current rate limit status */
  rateLimitStatus: Awaited<ReturnType<typeof rateLimiter.limit>>,
) => {
  const headers: Record<string, string> = {
    "X-RateLimit-Limit": WAITLIST_RATE_LIMIT.REQUESTS_PER_WINDOW.toString(),
  };

  if (rateLimitStatus.retryAfter) {
    headers["X-RateLimit-Remaining"] = "0";
    const currentTimeInSeconds = Date.now() / 1000;
    headers["X-RateLimit-Reset"] = Math.ceil(
      currentTimeInSeconds + rateLimitStatus.retryAfter,
    ).toString();
    headers["Retry-After"] = rateLimitStatus.retryAfter.toString();
  }

  return headers;
};

/**
 * Creates a Response object with the specified details
 */
const createResponse = (
  /** The API response object */
  response: ApiResponse,
  /** Response initialization options including status and headers */
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
 * HTTP endpoint for adding an email to the waitlist
 */
export const addEmailToWaitlistHttp = httpAction(async (ctx, request) => {
  const requestId = `${
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cookie") ||
    "unknown"
  }-${request.headers.get("origin") || "unknown"}`
  const rateLimitStatus = await rateLimiter.limit(ctx, "waitlistSignUp", {
    key: requestId,
    config: {
      kind: WAITLIST_RATE_LIMIT.ALGORITHM,
      rate: WAITLIST_RATE_LIMIT.REQUESTS_PER_WINDOW,
      period: WAITLIST_RATE_LIMIT.WINDOW_DURATION,
      capacity: WAITLIST_RATE_LIMIT.BURST_CAPACITY,
    },
  });

  const rateLimitHeaders = createRateLimitHeaders(rateLimitStatus);

  if (!rateLimitStatus.ok) {
    console.warn("addEmailToWaitlistHttp::Rate limit exceeded", {
      retryAfter: rateLimitStatus.retryAfter,
    });
    return createResponse(
      {
        success: false,
        message: `Muitas tentativas. Por favor, aguarde ${rateLimitStatus.retryAfter} segundos antes de tentar novamente.`,
        code: "TOO_MANY_REQUESTS",
        errors: [],
      },
      {
        status: HTTP_STATUS.TOO_MANY_REQUESTS,
        headers: rateLimitHeaders,
      },
    );
  }

  let args: unknown;

  try {
    args = await request.json();
  } catch (error) {
    console.error(
      "addEmailToWaitlistHttp::JSON parsing error in waitlist HTTP action:",
      error,
    );
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
        headers: rateLimitHeaders,
      },
    );
  }

  const result = waitlistSchema.safeParse(args);

  if (!result.success) {
    console.error(
      "addEmailToWaitlistHttp::Validation error in waitlist HTTP action:",
      result.error.errors,
    );
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
        headers: rateLimitHeaders,
      },
    );
  }

  try {
    await ctx.runMutation(internal.waitlist.addEmailToWaitlist, {
      email: result.data.email,
    });
  } catch (err) {
    console.error("addEmailToWaitlistHttp::Mutation failed", err);
    return createResponse(
      {
        success: false,
        message: ErrorCodeCatalog.INTERNAL_SERVER_ERROR,
        code: "INTERNAL_SERVER_ERROR",
        errors: [],
      },
      {
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        headers: rateLimitHeaders,
      },
    );
  }

  return createResponse(
    {
      success: true,
      message: "Email adicionado com sucesso!",
    },
    {
      status: HTTP_STATUS.CREATED,
      headers: rateLimitHeaders,
    },
  );
});
