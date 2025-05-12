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
 * Submits an email address to the waitlist via a POST request.
 *
 * Sends the provided email to the waitlist endpoint and returns the result,
 * including success status and any error details.
 *
 * @param request - The incoming HTTP request
 * @returns A response indicating whether the email was successfully added or describing any errors encountered
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
