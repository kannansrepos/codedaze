import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'www.youtube.com'],
  },

  /* config options here */
};

export default nextConfig;
