"use client";

import { useEffect, type RefObject } from "react";
import { workItems, type WorkItemId } from "../utils/workData";

type UseActiveWorkProjectOptions = {
  scrollContainer: RefObject<HTMLDivElement | null>;
  isReady: boolean;
  onActiveChange: (id: WorkItemId | null) => void;
};

/**
 * Tracks the active work project at the scroll container midpoint via IntersectionObserver.
 */
export const useActiveWorkProject = ({
  scrollContainer,
  isReady,
  onActiveChange,
}: UseActiveWorkProjectOptions) => {
  useEffect(() => {
    if (!isReady) return;

    const wrapper = scrollContainer.current;
    if (!wrapper) return;

    const chapters = Array.from(
      wrapper.querySelectorAll<HTMLElement>("[data-work-project]"),
    );

    if (chapters.length === 0) return;

    const visibleIds = new Set<string>();

    const syncActiveProject = () => {
      let nextActiveId: WorkItemId | null = null;

      for (const item of workItems) {
        if (visibleIds.has(item.id)) {
          nextActiveId = item.id;
          break;
        }
      }

      onActiveChange(nextActiveId);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.getAttribute("data-work-project");
          if (!id) continue;

          if (entry.isIntersecting) {
            visibleIds.add(id);
          } else {
            visibleIds.delete(id);
          }
        }

        syncActiveProject();
      },
      {
        root: wrapper,
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      },
    );

    for (const chapter of chapters) {
      observer.observe(chapter);
    }

    return () => observer.disconnect();
  }, [isReady, onActiveChange, scrollContainer]);
};
