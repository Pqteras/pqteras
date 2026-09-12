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

/**
 * Returns true when `candidate` is `root` or a path under `root`.
 */
const isPathInsideRoot = (root: string, candidate: string): boolean =>
  candidate === root || candidate.startsWith(`${root}${path.sep}`);

/**
 * Reads image files from a public folder path and returns them sorted
 * with numeric-aware ordering (screenshot_2 before screenshot_10).
 *
 * @param folderPublicPath - Public URL path such as `/projects/docrivo`.
 * @returns Sorted public image paths, or an empty array when missing/empty.
 */
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
