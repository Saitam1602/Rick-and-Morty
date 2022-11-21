const withAntdLess = require("next-plugin-antd-less");

// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

/** @type {import('next').NextConfig} */
const moduleExports = withAntdLess({
  reactStrictMode: true,
  output: "standalone",
  sentry: {
    hideSourceMaps: true,
  },
  webpack(config) {
    return config;
  },
});

module.exports = moduleExports;