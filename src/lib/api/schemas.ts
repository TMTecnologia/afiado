import { z } from "zod";

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
