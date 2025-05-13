import { NextResponse } from "next/server";
import { z } from "zod";
import { env } from "~/env";
import {
  ErrorCodeCatalog,
  HTTP_STATUS,
  responseStatusToErrorCode,
  responseToErrorMessage,
} from "~/lib/api/constants";
import { emailSchema } from "~/lib/api/schemas";
import type { ApiResponse } from "~/lib/api/types";

/**
 * Use Edge Runtime for CloudFlare Pages compatibility
 */
export const runtime = "edge";

/**
 * Schema to validate the request params/args
 */
const requestSchema = z.object({
  email: emailSchema,
});

/**
 * Schema to validate the error response from Convex
 */
const errorResponseSchema = z.object({
  message: z.string(),
  errors: z.array(
    z.object({
      path: z.string(),
      message: z.string(),
    }),
  ),
});

/**
 * Handles a POST request to add an email address to the waitlist.
 *
 * Validates the request body for a valid email, forwards it to the waitlist endpoint, and returns a structured response indicating success or detailing any validation or processing errors.
 *
 * @param request - The incoming HTTP request containing the email to be added.
 * @returns A JSON response indicating the result of the waitlist submission.
 */
export async function POST(
  request: Request,
): Promise<NextResponse<ApiResponse>> {
  let args: unknown;

  try {
    args = await request.json();
  } catch (error) {
    return NextResponse.json(
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
      { status: HTTP_STATUS.UNPROCESSABLE_CONTENT },
    );
  }

  const result = requestSchema.safeParse(args);

  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        message: ErrorCodeCatalog.VALIDATION_ERROR,
        code: "VALIDATION_ERROR",
        errors: result.error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      },
      { status: HTTP_STATUS.UNPROCESSABLE_CONTENT },
    );
  }

  const waitlistUrl = new URL("waitlist", env.CONVEX_SITE_URL);
  const response = await fetch(waitlistUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      /**
       * Important to pipe the Origin header from NextJS to Convex request
       *
       * This allows us to enforce the CORS policy
       */
      Origin: request.headers.get("Origin") ?? "",
    },
    body: JSON.stringify(result.data),
  });

  if (response.ok) {
    return NextResponse.json({
      success: true,
      message: "Email adicionado com sucesso!",
    });
  }

  let errorBody: unknown;

  try {
    // Try to parse the error body, but it might not exist
    errorBody = await response.json();
  } catch {
    // No body or invalid JSON
    errorBody = null;
  }

  console.error("[POST] /api/waitlist :: Error received from Convex:", {
    status: response.status,
    error: errorBody,
  });

  const parsedError = errorResponseSchema.safeParse(errorBody ?? {});

  return NextResponse.json(
    {
      success: false,
      message: responseToErrorMessage(response),
      code: responseStatusToErrorCode(response.status),
      errors: [],
      ...parsedError.data,
    },
    { status: response.status },
  );
}
