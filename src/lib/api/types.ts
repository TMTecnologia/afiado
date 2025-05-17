import type { z } from "zod";
import type { Prettify } from "~/lib/utils";
import type {
  apiResponseSchema,
  errorResponseSchema,
  successResponseSchema,
} from "./schemas";

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
