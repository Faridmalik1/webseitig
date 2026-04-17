import type { NextConfig } from "next";
import path from "path";

const crmPort = Number(process.env.CRM_PORT ?? "5174");
const crmDevOrigin = `http://localhost:${crmPort}`;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname, "../../"),
  allowedDevOrigins: [
    process.env.REPLIT_DEV_DOMAIN ?? "",
    `*.${process.env.REPLIT_DEV_DOMAIN ?? ""}`,
    "*.sisko.replit.dev",
    "*.replit.dev",
  ].filter(Boolean),
  async rewrites() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/crm/:path*",
          destination: `${crmDevOrigin}/crm/:path*`,
        },
        {
          source: "/@vite/:path*",
          destination: `${crmDevOrigin}/@vite/:path*`,
        },
        {
          source: "/_vite/:path*",
          destination: `${crmDevOrigin}/_vite/:path*`,
        },
      ];
    }

    return [];
  },
};

export default nextConfig;
