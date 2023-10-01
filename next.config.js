/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: ["ui-avatars.com"],
  },
};

module.exports = nextConfig;
