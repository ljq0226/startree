/* eslint-disable n/prefer-global/process */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/*/**',
      },
    ],
  },
}

module.exports = {
  ...nextConfig,
  env: {
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
  },
}
