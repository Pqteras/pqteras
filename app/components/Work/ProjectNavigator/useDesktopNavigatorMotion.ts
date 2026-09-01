"use client";

import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import {
  clamp,
  MAX_MARKER_WIDTH,
  ROW_HEIGHT,
} from "./utils";

type UseDesktopNavigatorMotionOptions = {
  itemCount: number;
  reduceMotion: boolean;
};

const useDesktopNavigatorMotion = ({
  itemCount,
  reduceMotion,
}: UseDesktopNavigatorMotionOptions) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const hoveredIndexRef = useRef<number | null>(null);
  const pointerY = useMotionValue(-1);
  const rawTooltipX = useMotionValue(0);
  const rawTooltipY = useMotionValue(0);
  const tooltipX = useSpring(rawTooltipX, {
    stiffness: 200,
    damping: 25,
    mass: 0.5,
  });
  const tooltipY = useSpring(rawTooltipY, {
    stiffness: 200,
    damping: 25,
    mass: 0.5,
  });

  useEffect(() => {
    const resetMotion = () => {
      pointerY.set(-1);
      rawTooltipX.set(0);
      rawTooltipY.set(0);
      hoveredIndexRef.current = null;
      setHoveredIndex(null);
    };

    const handleWindowPointerOut = (event: globalThis.PointerEvent) => {
      if (!event.relatedTarget) resetMotion();
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") resetMotion();
    };

    window.addEventListener("pointerout", handleWindowPointerOut);
    window.addEventListener("blur", resetMotion);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("pointerout", handleWindowPointerOut);
      window.removeEventListener("blur", resetMotion);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [pointerY, rawTooltipX, rawTooltipY]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const localY = clamp(event.clientY - bounds.top, 0, itemCount * ROW_HEIGHT);
    const nextIndex = clamp(
      Math.floor(localY / ROW_HEIGHT),
      0,
      Math.max(itemCount - 1, 0),
    );

    pointerY.set(localY);

    if (nextIndex !== hoveredIndexRef.current) {
      hoveredIndexRef.current = nextIndex;
      setHoveredIndex(nextIndex);
    }

    if (reduceMotion) {
      rawTooltipX.set(0);
      rawTooltipY.set(0);
      return;
    }

    const rowCenter = nextIndex * ROW_HEIGHT + ROW_HEIGHT / 2;
    rawTooltipX.set(
      clamp(
        (event.clientX - bounds.left - MAX_MARKER_WIDTH / 2) * 0.4,
        -7,
        11,
      ),
    );
    rawTooltipY.set(clamp((localY - rowCenter) * 0.75, -6, 6));
  };

  const handlePointerLeave = () => {
    pointerY.set(-1);
    rawTooltipX.set(0);
    rawTooltipY.set(0);
    hoveredIndexRef.current = null;
    setHoveredIndex(null);
  };

  return {
    hoveredIndex,
    pointerY,
    tooltipX,
    tooltipY,
    handlePointerMove,
    handlePointerLeave,
  };
};

export default useDesktopNavigatorMotion;
