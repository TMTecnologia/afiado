import { NextResponse } from "next/server";
import { z } from "zod";
import { env } from "~/env";
import { ErrorCodeCatalog, HTTP_STATUS } from "~/lib/api/constants";
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

  try {
    const { email } = result.data;

    const waitlistUrl = new URL("waitlist", env.CONVEX_SITE_URL);
    const response = await fetch(waitlistUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("[POST] /api/waitlist :: Error received from Convex:", {
        status: response.status,
        error,
      });
      return NextResponse.json(
        {
          success: false,
          message: error.message,
          code: "VALIDATION_ERROR",
          errors: error.errors,
        },
        { status: response.status },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Email adicionado com sucesso!",
    });
  } catch (error) {
    console.error("[POST] /api/waitlist :: Unexpected server error:", error);
    return NextResponse.json(
      {
        success: false,
        message: ErrorCodeCatalog.INTERNAL_SERVER_ERROR,
        code: "INTERNAL_SERVER_ERROR",
        errors: [],
      },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
    );
  }
}
