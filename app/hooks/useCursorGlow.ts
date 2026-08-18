"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValue, useSpring } from "motion/react";

type CursorGlowResult = {
  isVisible: boolean;
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
};

type UseCursorGlowOptions = {
  enabled: boolean;
};

export const useCursorGlow = ({ enabled }: UseCursorGlowOptions) => {
  const mouseFrameRef = useRef<number | null>(null);
  const mousePositionRef = useRef<{ x: number; y: number } | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-600);
  const cursorY = useMotionValue(-600);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (!enabled) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (window.innerWidth < 768) return;

      setIsVisible(true);
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
        mouseFrameRef.current = null;
      });
    };

    const handlePointerLeave = (e: PointerEvent) => {
      if (!e.relatedTarget) setIsVisible(false);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerout", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerLeave);
      if (mouseFrameRef.current) {
        window.cancelAnimationFrame(mouseFrameRef.current);
        mouseFrameRef.current = null;
      }
    };
  }, [enabled, cursorX, cursorY]);

  return {
    isVisible: enabled && isVisible,
    springX,
    springY,
  } satisfies CursorGlowResult;
};

