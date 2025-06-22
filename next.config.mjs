/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['media.istockphoto.com', 'source.unsplash.com'],
  },
  experimental: {
    appDir: true,
  },
};
export default nextConfig;
