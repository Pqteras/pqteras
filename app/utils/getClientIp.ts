import { headers } from "next/headers";

/**
 * Resolves the visitor's IP for rate limiting.
 *
 * Vercel overwrites `x-forwarded-for` with whoever connected to its edge, so
 * behind Cloudflare that's Cloudflare's IP, not the visitor's — and Cloudflare
 * only appends to (never replaces) a pre-existing `x-forwarded-for`, so a
 * client-forged value survives. `cf-connecting-ip` is set by Cloudflare
 * itself and can't be spoofed by the client, so it takes priority.
 */
export const getClientIp = async (): Promise<string> => {
  const headersList = await headers();

  const cfConnectingIp = headersList.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp;

  return (
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  );
};
