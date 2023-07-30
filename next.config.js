/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'doope.jp',
        port: '',
        pathname: '/media/22q2/**',
      },
      {
        protocol: process.env.NEXT_PUBLIC_WEB_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_WEB_DOMAIN,
      },
    ],
  },
}

module.exports = nextConfig
