/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  output: undefined // remove 'export' if present
};

module.exports = nextConfig;
