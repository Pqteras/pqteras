import { headers } from "next/headers";

/**
 * Resolves the visitor's IP for rate limiting.
 *
 * Prefer platform-trusted headers first. `cf-connecting-ip` is set by
 * Cloudflare and cannot be spoofed by the client. On Vercel without
 * Cloudflare, `x-real-ip` / `x-vercel-forwarded-for` reflect the edge
 * connection. Only then fall back to the first `x-forwarded-for` hop.
 */
export const getClientIp = async (): Promise<string> => {
  const headersList = await headers();

  const trusted =
    headersList.get("cf-connecting-ip") ??
    headersList.get("x-real-ip") ??
    headersList.get("x-vercel-forwarded-for")?.split(",")[0]?.trim();

  if (trusted) return trusted;

  return (
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  );
};
