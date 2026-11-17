import { headers } from "next/headers";

// Edge-set headers first; x-forwarded-for is client-controlled, so it is the last resort.
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
