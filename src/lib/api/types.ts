import type { Prettify } from "../utils";
import type { ErrorCode } from "./constants";
import { z } from "zod";

export const successResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  code: z.never().optional(),
  errors: z.never().optional(),
});

export const errorResponseSchema = z.object({
  success: z.literal(false),
  message: z.string(),
  // The error code types are already being enforced on the API createResponse
  // So they will not be enforced manually here, for the time being
  code: z.string() as z.ZodType<ErrorCode>,
  errors: z.array(z.object({
    path: z.string(),
    message: z.string(),
  })),
});

export const apiResponseSchema = z.discriminatedUnion("success", [
  successResponseSchema,
  errorResponseSchema,
]);

type SuccessResponse = Prettify<z.infer<typeof successResponseSchema>>;

type ErrorResponse = Prettify<z.infer<typeof errorResponseSchema>>;

export type ApiResponse = Prettify<z.infer<typeof apiResponseSchema>>;

/**
 * Determines whether the given API response represents a successful result.
 *
 * @param response - The API response to check.
 * @returns True if the response is a {@link SuccessResponse}; otherwise, false.
 */
export function isSuccessResponse(
  response: ApiResponse,
): response is SuccessResponse {
  return response.success === true;
}

/**
 * Determines whether the given API response is an error response.
 *
 * @param response - The API response to check.
 * @returns `true` if the response is an {@link ErrorResponse}; otherwise, `false`.
 */
export function isErrorResponse(
  response: ApiResponse,
): response is ErrorResponse {
  return response.success === false;
}
