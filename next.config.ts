import type { NextConfig } from "next";
import os from "os";

function getAllowedDevOrigins(): string[] {
  const origins = new Set<string>(["localhost", "127.0.0.1"]);
  const subnets = new Set<string>([
    "192.168.0",
    "192.168.1",
    "192.168.2",
    "10.0.0",
    "10.0.1",
  ]);

  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family === "IPv4" && net.address) {
        origins.add(net.address);
        const parts = net.address.split(".");
        if (parts.length === 4) {
          subnets.add(parts.slice(0, 3).join("."));
        }
      }
    }
  }

  for (const subnet of subnets) {
    for (let i = 1; i <= 254; i++) {
      origins.add(`${subnet}.${i}`);
    }
  }

  return Array.from(origins);
}

const nextConfig: NextConfig = {
  allowedDevOrigins: getAllowedDevOrigins(),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/gh/devicons/**",
      },
    ],
  },
};

export default nextConfig;

