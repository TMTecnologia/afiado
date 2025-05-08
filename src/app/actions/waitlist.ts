"use server";

import path from "node:path";
import { env } from "~/env";

type WaitlistResponse = {
  success: boolean;
  message: string;
  errors?: Array<{ path: string; message: string }>;
};

export async function addToWaitlist(email: string): Promise<WaitlistResponse> {
  try {
    const response = await fetch(path.join(env.CONVEX_HTTP_URL, "waitlist"), {
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
