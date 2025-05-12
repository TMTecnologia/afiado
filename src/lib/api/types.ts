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
 * Type guard to check if a response is a success response
 */
export function isSuccessResponse(
  response: ApiResponse,
): response is SuccessResponse {
  return response.success === true;
}

/**
 * Type guard to check if a response is an error response
 */
export function isErrorResponse(
  response: ApiResponse,
): response is ErrorResponse {
  return response.success === false;
}
