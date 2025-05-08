"use server";

import path from "node:path";
import { env } from "~/env";

type WaitlistResponse = {
  success: boolean;
  message: string;
  errors?: Array<{ path: string; message: string }>;
};

/**
 * Submits an email address to the waitlist via a POST request.
 *
 * Sends the provided {@link email} to the waitlist endpoint and returns the result, including success status and any error details.
 *
 * @param email - The email address to add to the waitlist.
 * @returns A {@link WaitlistResponse} indicating whether the email was successfully added or describing any errors encountered.
 */
export async function addToWaitlist(email: string): Promise<WaitlistResponse> {
  try {
    const waitlistUrl = new URL('waitlist', env.CONVEX_HTTP_URL);
    const response = await fetch(waitlistUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        message: error.message,
        errors: error.errors,
      };
    }

    return {
      success: true,
      message: "Email adicionado com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Erro ao adicionar email. Tente novamente mais tarde.",
    };
  }
}
