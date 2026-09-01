"use client";

import {
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef } from "react";
import { useWorkScroll } from "../context/WorkScrollContext";

type UseChapterParallaxOptions = {
  enabled: boolean;
};

type ChapterParallax = {
  y: MotionValue<number>;
  scale: MotionValue<number>;
};

/**
 * Applies the same chapter parallax mapping as the original per-chapter useScroll hook.
 */
export const useChapterParallax = (
  chapterElement: HTMLElement | null,
  { enabled }: UseChapterParallaxOptions,
): ChapterParallax | null => {
  const { scrollContainer } = useWorkScroll();
  const targetRef = useRef(chapterElement);

  useEffect(() => {
    targetRef.current = chapterElement;
  });

  const { scrollYProgress } = useScroll(
    enabled && chapterElement
      ? {
          container: scrollContainer,
          target: targetRef,
          offset: ["start end", "end start"],
        }
      : {},
  );

  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [56, 0, 0, -36]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.98, 1, 1, 0.985],
  );

  if (!enabled || !chapterElement) {
    return null;
  }

  return { y, scale };
};
