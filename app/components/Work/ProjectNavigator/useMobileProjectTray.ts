"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type UseMobileProjectTrayOptions = {
  activeIndex: number;
  onOpenChange: (open: boolean) => void;
};

const useMobileProjectTray = ({
  activeIndex,
  onOpenChange,
}: UseMobileProjectTrayOptions) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const setTrayOpen = useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen);
      onOpenChange(nextOpen);
    },
    [onOpenChange],
  );

  const openTray = useCallback(() => setTrayOpen(true), [setTrayOpen]);
  const closeTray = useCallback(() => setTrayOpen(false), [setTrayOpen]);

  useEffect(() => {
    if (!open) return;

    const focusTarget = itemRefs.current[activeIndex >= 0 ? activeIndex : 0];
    const focusFrame = window.requestAnimationFrame(() => focusTarget?.focus());

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeTray();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLButtonElement>(
          "button:not([disabled])",
        ),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      if (triggerRef.current?.isConnected) triggerRef.current.focus();
    };
  }, [activeIndex, closeTray, open]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches && open) closeTray();
    };

    desktopQuery.addEventListener("change", handleBreakpointChange);
    return () =>
      desktopQuery.removeEventListener("change", handleBreakpointChange);
  }, [closeTray, open]);

  return {
    open,
    openTray,
    closeTray,
    triggerRef,
    panelRef,
    itemRefs,
  };
};

export default useMobileProjectTray;
