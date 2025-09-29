import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lgdimdqopholrfpibips.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    domains: ['img.youtube.com'],
  },
};

export default nextConfig;
