/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'media.graphassets.com'
      },
      {
        hostname: 'sa-east-1.graphassets.com'
      }
    ],
  },
}

module.exports = nextConfig
