/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  // TODO: try deploying while keeping the node server running
  // @link https://nextjs.org/docs/app/building-your-application/deploying#nodejs-server
  output: 'export',
  reactStrictMode: true,

  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  // i18n: {
  //   locales: ["en"],
  //   defaultLocale: "en",
  // },
  experimental: {
    swcPlugins: [['@swc-jotai/react-refresh', {}]]
  }
};

export default config;
