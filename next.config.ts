import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.1.60',
        port: '3001',
        pathname: '/directory/**',
      },
    ],
  },
};

export default nextConfig;
