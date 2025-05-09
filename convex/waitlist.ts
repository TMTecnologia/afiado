import { NoOp } from "convex-helpers/server/customFunctions";
import { zCustomMutation } from "convex-helpers/server/zod";
import { z } from "zod";
import { internal } from "./_generated/api";
import { httpAction, internalMutation } from "./_generated/server";

const zInternalMutation = zCustomMutation(internalMutation, NoOp);

// Custom error messages in Portuguese
const errorMessages = {
  email: {
    required: "O e-mail é obrigatório",
    invalid: "Formato de e-mail inválido",
  },
  json: {
    invalid: "O corpo da requisição deve ser um JSON válido",
  },
  validation: {
    failed: "Falha na validação",
  },
} as const;

const waitlistSchema = z.object({
  email: z
    .string({
      required_error: errorMessages.email.required,
    })
    .email(errorMessages.email.invalid),
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
      message: "Payload JSON inválido",
      code: "INVALID_JSON",
      errors: [
        {
          path: "body",
          message: errorMessages.json.invalid,
        },
      ],
    });
  }

  const result = waitlistSchema.safeParse(args);

  if (!result.success) {
    return createErrorResponse({
      message: errorMessages.validation.failed,
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
