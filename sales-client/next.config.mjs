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

  experimental: {
    swcPlugins: [['@swc-jotai/react-refresh', {}]]
  }
};

export default config;
