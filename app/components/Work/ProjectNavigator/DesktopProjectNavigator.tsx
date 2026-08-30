"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import DesktopProjectMarker from "./DesktopProjectMarker";
import type { ProjectNavigatorViewProps } from "./types";
import useDesktopNavigatorMotion from "./useDesktopNavigatorMotion";
import { getNavigationTarget } from "./utils";

const DesktopProjectNavigator = ({
  items,
  activeId,
  onSelect,
}: ProjectNavigatorViewProps) => {
  const reduceMotion = useReducedMotion() ?? false;
  const [focusVisibleIndex, setFocusVisibleIndex] = useState<number | null>(
    null,
  );
  const [rovingIndex, setRovingIndex] = useState(0);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeIndex = items.findIndex((item) => item.id === activeId);
  const {
    hoveredIndex,
    pointerY,
    tooltipX,
    tooltipY,
    handlePointerMove,
    handlePointerLeave,
  } = useDesktopNavigatorMotion({
    itemCount: items.length,
    reduceMotion,
  });
  const expandedIndex = hoveredIndex ?? focusVisibleIndex;

  useEffect(() => {
    if (activeIndex >= 0) setRovingIndex(activeIndex);
  }, [activeIndex]);

  const handleMarkerKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const targetIndex = getNavigationTarget(event.key, index, items.length);
    if (targetIndex === null) return;

    event.preventDefault();
    setRovingIndex(targetIndex);
    buttonRefs.current[targetIndex]?.focus();
  };

  return (
    <nav
      aria-label="Project navigator"
      className="absolute left-3 top-1/2 z-30 hidden w-60 -translate-y-1/2 md:block lg:left-5"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocusVisibleIndex(null);
        }
      }}
    >
      <span className="mb-2 block text-[9px] font-medium uppercase tracking-[0.18em] text-white/25">
        Projects
      </span>
      <div
        className="h-28 w-60"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {items.map((item, index) => (
          <DesktopProjectMarker
            key={item.id}
            item={item}
            index={index}
            active={item.id === activeId}
            expanded={expandedIndex === index}
            reduceMotion={reduceMotion}
            pointerY={pointerY}
            tooltipX={tooltipX}
            tooltipY={tooltipY}
            buttonRef={(node) => {
              buttonRefs.current[index] = node;
            }}
            tabIndex={rovingIndex === index ? 0 : -1}
            onFocus={(event) => {
              setRovingIndex(index);
              setFocusVisibleIndex(
                event.currentTarget.matches(":focus-visible") ? index : null,
              );
            }}
            onSelect={() => onSelect(item.id)}
            onKeyDown={(event) => handleMarkerKeyDown(event, index)}
          />
        ))}
      </div>
      <span className="mt-2 block text-[10px] tabular-nums text-white/35">
        {activeIndex >= 0 ? String(activeIndex + 1).padStart(2, "0") : "--"} /{" "}
        {String(items.length).padStart(2, "0")}
      </span>
    </nav>
  );
};

export default DesktopProjectNavigator;
