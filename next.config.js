import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
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
      /** PostHog routes */
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
      /** Convex routes */
      {
        source: "/api/waitlist",
        destination: `${env.CONVEX_SITE_URL}/waitlist`,
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

if (env.NODE_ENV === "development") {
  await setupDevPlatform();
}

export default withMDX(config);
