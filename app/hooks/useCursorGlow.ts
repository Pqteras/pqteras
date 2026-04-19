"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "motion/react";

type CursorGlowResult = {
  glowRef: React.RefObject<HTMLDivElement | null>;
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
};

type UseCursorGlowOptions = {
  /** When false, no listeners (SSR / pre-mount). */
  enabled: boolean;
  /** Spotlight gradient; keep cursor dot even when false. */
  showGlow?: boolean;
};

export const useCursorGlow = ({
  enabled,
  showGlow = true,
}: UseCursorGlowOptions) => {
  const glowRef = useRef<HTMLDivElement>(null);
  const mouseFrameRef = useRef<number | null>(null);
  const mousePositionRef = useRef<{ x: number; y: number } | null>(null);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (!enabled) return;

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    cursorX.set(cx);
    cursorY.set(cy);
    if (showGlow && glowRef.current) {
      glowRef.current.style.background = `radial-gradient(560px circle at ${cx}px ${cy}px, rgba(253, 224, 71, 0.14) 0%, rgba(253, 224, 71, 0.05) 35%, transparent 55%)`;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;

      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      if (mouseFrameRef.current) return;

      mouseFrameRef.current = window.requestAnimationFrame(() => {
        const nextPosition = mousePositionRef.current;
        if (!nextPosition) {
          mouseFrameRef.current = null;
          return;
        }

        cursorX.set(nextPosition.x);
        cursorY.set(nextPosition.y);

        if (showGlow && glowRef.current) {
          glowRef.current.style.background = `radial-gradient(560px circle at ${nextPosition.x}px ${nextPosition.y}px, rgba(253, 224, 71, 0.14) 0%, rgba(253, 224, 71, 0.05) 35%, transparent 55%)`;
        }

        mouseFrameRef.current = null;
      });
    };

    const handleMouseLeave = () => {
      if (glowRef.current) glowRef.current.style.background = "none";
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (mouseFrameRef.current) {
        window.cancelAnimationFrame(mouseFrameRef.current);
        mouseFrameRef.current = null;
      }
    };
  }, [enabled, showGlow, cursorX, cursorY]);

  return { glowRef, springX, springY } satisfies CursorGlowResult;
};

