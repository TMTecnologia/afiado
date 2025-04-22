/**
 * CloudFlare Pages is incompatible with Instrumentation
 * @see {@link https://github.com/cloudflare/next-on-pages/issues/678#issuecomment-2236272058}
 */
import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Initialize Sentry
if (process.env.NEXT_RUNTIME === "nodejs") {
  await import("./sentry.server.config");
} else if (process.env.NEXT_RUNTIME === "edge") {
  await import("./sentry.edge.config");
}

export function middleware(request: NextRequest) {
  try {
    return NextResponse.next();
  } catch (error) {
    Sentry.captureException(error);
    throw error;
  }
}
