import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    CI: z
      .enum(["true", "false"])
      .transform((value) => value === "true")
      .optional(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    CONVEX_SITE_URL: z.string().url(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_AHREFS_ANALYTICS_KEY: z.string(),
    NEXT_PUBLIC_CONVEX_DEPLOYMENT_URL: z.string().url(),
    NEXT_PUBLIC_POSTHOG_KEY: z.string(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().url(),
    NEXT_PUBLIC_POSTHOG_STATIC_ASSETS_HOST: z.string().url(),
    NEXT_PUBLIC_POSTHOG_DEBUG: z
      .enum(["true", "false"])
      .transform((value) => value === "true")
      .optional(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    CI: process.env.CI,
    CONVEX_SITE_URL: process.env.CONVEX_SITE_URL,
    NEXT_PUBLIC_AHREFS_ANALYTICS_KEY:
      process.env.NEXT_PUBLIC_AHREFS_ANALYTICS_KEY,
    NEXT_PUBLIC_CONVEX_DEPLOYMENT_URL:
      process.env.NEXT_PUBLIC_CONVEX_DEPLOYMENT_URL,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_POSTHOG_STATIC_ASSETS_HOST:
      process.env.NEXT_PUBLIC_POSTHOG_STATIC_ASSETS_HOST,
    NEXT_PUBLIC_POSTHOG_DEBUG: process.env.NEXT_PUBLIC_POSTHOB_DEBUG,
    NODE_ENV: process.env.NODE_ENV,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
