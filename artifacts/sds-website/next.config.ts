import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname, "../../"),
  allowedDevOrigins: [
    process.env.REPLIT_DEV_DOMAIN ?? "",
    `*.${process.env.REPLIT_DEV_DOMAIN ?? ""}`,
    "*.sisko.replit.dev",
    "*.replit.dev",
  ].filter(Boolean),
};

export default nextConfig;
