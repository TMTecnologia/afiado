import type { Prettify } from "~/lib/utils";

/**
 * HTTP response status codes
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status}
 */
export const HTTP_STATUS = {
  /** The request succeeded, and a new resource was created as a result */
  CREATED: 201,
  /** The client client is authenticated but lacks sufficient permissions */
  FORBIDDEN: 403,
  /** The request was well-formed but was unable to be followed due to semantic errors */
  UNPROCESSABLE_CONTENT: 422,
  /** The user has sent too many requests in a given amount of time (Rate Limiting) */
  TOO_MANY_REQUESTS: 429,
  /** The server has encountered a situation it does not know how to handle */
  INTERNAL_SERVER_ERROR: 500,
} as const;

export enum InternalErrorCode {
  /** Invalid JSON Payload */
  INVALID_JSON = "INVALID_JSON",
  /** The request was well-formed but was unable to be followed due to input validation errors */
  VALIDATION_ERROR = "VALIDATION_ERROR",
}

/**
 * Type for HTTP errors, i.e, non 2xx | 3xx status
 */
export type HTTP_ERROR_STATUS = Exclude<keyof typeof HTTP_STATUS, "CREATED">;

/**
 * Type for error codes
 */
export type ErrorCode = Prettify<
  keyof typeof InternalErrorCode | HTTP_ERROR_STATUS
>;
