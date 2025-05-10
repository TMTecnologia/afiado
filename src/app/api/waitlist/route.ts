import { NextResponse } from "next/server";
// import { env } from "~/env";

/**
 * Use Edge Runtime for CloudFlare Pages compatibility
 */
export const runtime = "edge";

type WaitlistResponse = {
  success: boolean;
  message: string;
  errors?: Array<{ path: string; message: string }>;
};

export async function POST(
  request: Request,
): Promise<NextResponse<WaitlistResponse>> {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email é obrigatório",
          errors: [{ path: "email", message: "Email é obrigatório" }],
        },
        { status: 400 },
      );
    }

    console.log(JSON.stringify(process.env, null, 2))

    const waitlistUrl = new URL("waitlist", process.env.CONVEX_SITE_URL);
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
        message: "Erro ao adicionar email. Tente novamente mais tarde.",
      },
      { status: 500 },
    );
  }
}
