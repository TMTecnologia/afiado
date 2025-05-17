import { z } from "zod";
import type { ErrorCode } from "./constants";

/**
 * Custom error messages in Portuguese
 */
export const errorMessages = {
  email: {
    required: "O e-mail é obrigatório",
    invalid: "Formato de e-mail inválido",
  },
} as const;

/**
 * Schema for validating email addresses
 */
export const emailSchema = z
  .string({
    required_error: errorMessages.email.required,
  })
  .email(errorMessages.email.invalid);

/**
 * Successful API Response Schema
 */
export const successResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  code: z.never().optional(),
  errors: z.never().optional(),
});

/**
 * Error API Response Schema
 */
export const errorResponseSchema = z.object({
  success: z.literal(false),
  message: z.string(),
  // The error code types are already being enforced on the API createResponse
  // So they will not be enforced manually here, for the time being
  code: z.string() as z.ZodType<ErrorCode>,
  errors: z.array(
    z.object({
      path: z.string(),
      message: z.string(),
    }),
  ),
});

/**
 * API Response Schema
 */
export const apiResponseSchema = z.discriminatedUnion("success", [
  successResponseSchema,
  errorResponseSchema,
]);
