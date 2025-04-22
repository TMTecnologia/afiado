import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
import { withSentryConfig } from "@sentry/nextjs";
import { createMDX } from "fumadocs-mdx/next";
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import { env } from "./src/env.js";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: `${env.NEXT_PUBLIC_POSTHOG_STATIC_ASSETS_HOST}/:path*`,
      },
      {
        source: "/ingest/:path*",
        destination: `${env.NEXT_PUBLIC_POSTHOG_HOST}/:path*`,
      },
      {
        source: "/ingest/decide",
        destination: `${env.NEXT_PUBLIC_POSTHOG_HOST}/decide`,
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

if (env.NODE_ENV === "development") {
  await setupDevPlatform();
}

// Make sure adding Sentry options is the last code to run before exporting
export default withSentryConfig(withMDX(config), {
  org: "TMTecnologia",
  project: "afiado",

  // Only print logs for uploading source maps in CI
  // Set to `true` to suppress logs
  silent: !env.CI,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,
});
