import "server-only";

import { readdirSync } from "node:fs";
import path from "node:path";

const IMAGE_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".avif",
]);

const isPathInsideRoot = (root: string, candidate: string): boolean =>
  candidate === root || candidate.startsWith(`${root}${path.sep}`);

export const resolveScreenshotFolder = (
  folderPublicPath: string,
): string[] => {
  const normalized = folderPublicPath.replace(/\\/g, "/").replace(/\/+$/, "");
  const relativeDir = normalized.replace(/^\//, "");

  if (
    !relativeDir ||
    relativeDir.split("/").some((segment) => segment === ".." || segment === "")
  ) {
    return [];
  }

  const publicRoot = path.resolve(process.cwd(), "public");
  const absoluteDir = path.resolve(publicRoot, relativeDir);

  if (!isPathInsideRoot(publicRoot, absoluteDir)) {
    return [];
  }

  let entries: string[];
  try {
    entries = readdirSync(absoluteDir);
  } catch {
    return [];
  }

  return entries
    .filter((entry) => {
      if (entry.includes("/") || entry.includes("\\") || entry.includes("\0")) {
        return false;
      }
      return IMAGE_EXTENSIONS.has(path.extname(entry).toLowerCase());
    })
    .sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }),
    )
    .map((entry) => `${normalized}/${entry}`);
};
