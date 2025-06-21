/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['media.istockphoto.com', 'source.unsplash.com'],
  },
  experimental: {
    mdxRs: true,
    appDir: true,
  },
};
import withMDX from '@next/mdx'
export default withMDX(nextConfig);
