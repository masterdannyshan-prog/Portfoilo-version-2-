import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  agentRules: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mir-s3-cdn-cf.behance.net",
        port: "",
        pathname: "/projects/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
