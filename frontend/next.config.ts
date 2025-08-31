import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  async redirects() {
    return [
      {
        source: "/project",
        destination: "/dashboard",
        permanent: false
      }
    ]
  },
};

export default nextConfig;
