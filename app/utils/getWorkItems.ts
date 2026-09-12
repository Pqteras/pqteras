import "server-only";

import {
  workItemSources,
  type WorkItem,
} from "./workData";
import { resolveScreenshotFolder } from "./resolveScreenshotFolder";

/**
 * Builds work items with screenshots resolved from each project's folder.
 */
export const getWorkItems = (): WorkItem[] =>
  workItemSources.map(({ screenshotFolder, ...item }) => {
    if (!screenshotFolder) {
      return item;
    }

    const screenshots = resolveScreenshotFolder(screenshotFolder);
    if (screenshots.length === 0) {
      return item;
    }

    return { ...item, screenshots };
  });
