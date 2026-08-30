"use client";

import {
  AnimatePresence,
  motion,
  useTransform,
  type MotionValue,
} from "motion/react";
import type { FocusEvent, KeyboardEvent } from "react";
import type { WorkItem } from "../../../utils/workData";
import ProjectIcon from "./ProjectIcon";
import {
  clamp,
  MAGNIFICATION_RADIUS,
  MAX_MARKER_HEIGHT,
  MAX_MARKER_WIDTH,
  ROW_HEIGHT,
} from "./utils";

type DesktopProjectMarkerProps = {
  item: WorkItem;
  index: number;
  active: boolean;
  expanded: boolean;
  reduceMotion: boolean;
  pointerY: MotionValue<number>;
  tooltipX: MotionValue<number>;
  tooltipY: MotionValue<number>;
  buttonRef: (node: HTMLButtonElement | null) => void;
  tabIndex: number;
  onFocus: (event: FocusEvent<HTMLButtonElement>) => void;
  onSelect: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
};

const getInfluence = (cursorPosition: number, rowCenter: number) => {
  const distance = Math.abs(cursorPosition - rowCenter);
  const influence = clamp(1 - distance / MAGNIFICATION_RADIUS, 0, 1);
  return influence * influence * (3 - 2 * influence);
};

const DesktopProjectMarker = ({
  item,
  index,
  active,
  expanded,
  reduceMotion,
  pointerY,
  tooltipX,
  tooltipY,
  buttonRef,
  tabIndex,
  onFocus,
  onSelect,
  onKeyDown,
}: DesktopProjectMarkerProps) => {
  const baseWidth = active ? 22 : 9;
  const baseHeight = active ? 3 : 2;
  const rowCenter = index * ROW_HEIGHT + ROW_HEIGHT / 2;
  const markerWidth = useTransform(pointerY, (cursorPosition) => {
    if (reduceMotion || cursorPosition < 0) return baseWidth;
    const influence = getInfluence(cursorPosition, rowCenter);
    return baseWidth + (MAX_MARKER_WIDTH - baseWidth) * influence;
  });
  const markerHeight = useTransform(pointerY, (cursorPosition) => {
    if (reduceMotion || cursorPosition < 0) return baseHeight;
    const influence = getInfluence(cursorPosition, rowCenter);
    return baseHeight + (MAX_MARKER_HEIGHT - baseHeight) * influence;
  });

  return (
    <button
      ref={buttonRef}
      type="button"
      tabIndex={tabIndex}
      onFocus={onFocus}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      aria-label={`Jump to ${item.name}`}
      aria-current={active ? "location" : undefined}
      className="group relative flex h-4 w-60 items-center text-left outline-none"
    >
      <motion.span
        style={{ width: markerWidth, height: markerHeight }}
        className={`block rounded-full transition-colors duration-200 group-focus-visible:ring-2 group-focus-visible:ring-yellow-300/70 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-surface ${
          active
            ? "bg-yellow-300 shadow-[0_0_12px_rgba(253,224,71,0.34)]"
            : "bg-white/25 group-hover:bg-white/45 group-focus-visible:bg-white/50"
        }`}
        aria-hidden="true"
      />

      <AnimatePresence>
        {expanded && (
          <motion.span
            layoutId={reduceMotion ? undefined : "work-project-label"}
            style={{ x: tooltipX, y: tooltipY }}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 430, damping: 34, mass: 0.62 }
            }
            className="pointer-events-none absolute left-14 -top-3.5 z-20 flex h-11 w-52 items-center gap-3 rounded-xl bg-[#292929]/97 px-3 shadow-[0_12px_32px_rgba(0,0,0,0.32)] backdrop-blur-md"
          >
            <ProjectIcon item={item} />
            <span className="min-w-0 flex-1 whitespace-nowrap text-sm font-medium text-white/88">
              {item.name}
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

export default DesktopProjectMarker;
