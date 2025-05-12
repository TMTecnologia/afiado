import type { ErrorCode } from "./constants";

/**
 * Represents a successful API response
 */
export type SuccessResponse = {
  success: true;
  message: string;
  code?: never;
  errors?: never;
};

/**
 * Represents an error API response
 */
export type ErrorResponse = {
  success: false;
  message: string;
  code: ErrorCode;
  errors: Array<{ path: string; message: string }>;
};

/**
 * Catalog of possible response types
 */
export type ApiResponseCatalog = {
  success: SuccessResponse;
  error: ErrorResponse;
};

/**
 * Union type of all possible API responses
 */
export type ApiResponse = ApiResponseCatalog[keyof ApiResponseCatalog];

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
