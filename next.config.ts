import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yourhealthsupply.ca",
        pathname: "/cdn/shop/**",
      },
    ],
  },
};

export default nextConfig;
