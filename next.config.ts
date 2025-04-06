import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'mjezigxbdmqyngcbgeep.supabase.co',
      pathname: '/storage/v1/object/public/**',
    }],
  },
};

export default nextConfig;
