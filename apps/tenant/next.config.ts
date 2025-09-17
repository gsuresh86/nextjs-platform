import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable custom domains
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
  // Handle custom domains
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*',
      },
    ];
  },
};

export default nextConfig;