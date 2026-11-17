"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from "motion/react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { usePortfolioOverlay } from "../PortfolioShell/PortfolioShell";
import { duration, ease } from "../../motion/tokens";
import type { WorkItem } from "../../utils/workData";

type ProjectGalleryProps = {
  item: WorkItem | null;
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  onClose: () => void;
};

const SWIPE_THRESHOLD = 60;

const controlClassName =
  "grid size-11 cursor-pointer place-items-center rounded-full border border-line bg-raised text-muted transition-colors duration-150 hover:border-line-strong hover:text-fg";

const ProjectGallery = ({
  item,
  activeIndex,
  onActiveIndexChange,
  onClose,
}: ProjectGalleryProps) => {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const setOverlayOpen = usePortfolioOverlay();
  const reduceMotion = useReducedMotion() ?? false;
  const screenshots = item?.screenshots ?? [];
  const hasMultiple = screenshots.length > 1;
  const onActiveIndexChangeRef = useRef(onActiveIndexChange);
  const onCloseRef = useRef(onClose);
  const activeIndexRef = useRef(activeIndex);
  const screenshotCountRef = useRef(screenshots.length);

  useEffect(() => {
    onActiveIndexChangeRef.current = onActiveIndexChange;
    onCloseRef.current = onClose;
    activeIndexRef.current = activeIndex;
    screenshotCountRef.current = screenshots.length;
  });

  const showPrevious = () => {
    const count = screenshotCountRef.current;
    const index = activeIndexRef.current;
    onActiveIndexChangeRef.current(index === 0 ? count - 1 : index - 1);
  };

  const showNext = () => {
    const count = screenshotCountRef.current;
    const index = activeIndexRef.current;
    onActiveIndexChangeRef.current(index === count - 1 ? 0 : index + 1);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x <= -SWIPE_THRESHOLD) showNext();
    else if (info.offset.x >= SWIPE_THRESHOLD) showPrevious();
  };

  useEffect(() => {
    setOverlayOpen(Boolean(item));
    return () => setOverlayOpen(false);
  }, [item, setOverlayOpen]);

  useEffect(() => {
    if (!item) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [item]);

  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
      if (event.key === "ArrowLeft" && screenshotCountRef.current > 1) {
        showPrevious();
      }
      if (event.key === "ArrowRight" && screenshotCountRef.current > 1) {
        showNext();
      }
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            "button:not([disabled])",
          ),
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [item]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {item && screenshots.length > 0 && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: duration.fast } }}
          transition={{ duration: reduceMotion ? 0.1 : duration.base }}
          onClick={onClose}
          className="fixed inset-0 z-300 flex flex-col bg-[#0d0c0b]"
        >
          <header className="flex shrink-0 items-center justify-between gap-4 px-4 py-3 md:px-6 md:py-4">
            <h2
              id="gallery-title"
              className="truncate text-base font-medium text-fg"
            >
              {item.name}
            </h2>
            <div className="flex items-center gap-4">
              {hasMultiple && (
                <span className="text-sm tabular-nums text-muted">
                  {activeIndex + 1}
                  <span className="text-faint"> / {screenshots.length}</span>
                </span>
              )}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className={controlClassName}
                aria-label="Close gallery"
              >
                <FiX size={18} aria-hidden="true" />
              </button>
            </div>
          </header>

          <div className="relative flex min-h-0 flex-1 items-center justify-center p-4 md:px-24 md:py-6">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={screenshots[activeIndex]}
                initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: reduceMotion ? 0.1 : duration.base,
                  ease: ease.out,
                }}
                drag={hasMultiple && !reduceMotion ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={handleDragEnd}
                onClick={(event) => event.stopPropagation()}
                className="relative max-h-full max-w-full touch-pan-y"
              >
                <Image
                  src={screenshots[activeIndex]}
                  alt={`${item.name} screenshot ${activeIndex + 1}`}
                  width={1600}
                  height={900}
                  sizes="(max-width: 768px) 100vw, 90vw"
                  loading="eager"
                  draggable={false}
                  className="max-h-[calc(100dvh-10rem)] w-auto max-w-full select-none rounded-xl border border-line object-contain shadow-[0_40px_100px_-40px_rgb(0_0_0/0.9)]"
                />
              </motion.div>
            </AnimatePresence>

            {hasMultiple && (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    showPrevious();
                  }}
                  className={`${controlClassName} absolute left-3 hidden sm:grid md:left-6`}
                  aria-label="Previous screenshot"
                >
                  <FiChevronLeft size={20} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    showNext();
                  }}
                  className={`${controlClassName} absolute right-3 hidden sm:grid md:right-6`}
                  aria-label="Next screenshot"
                >
                  <FiChevronRight size={20} aria-hidden="true" />
                </button>
              </>
            )}
          </div>

          {hasMultiple && (
            <nav
              className="flex shrink-0 justify-center px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]"
              aria-label="Choose screenshot"
              onClick={(event) => event.stopPropagation()}
            >
              {screenshots.map((screenshot, index) => (
                <button
                  key={screenshot}
                  type="button"
                  onClick={() => onActiveIndexChange(index)}
                  className="group grid h-8 cursor-pointer place-items-center px-1.5"
                  aria-label={`Show screenshot ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                >
                  <span
                    className={`block h-1.5 rounded-full transition-[width,background-color] duration-300 ease-out-expo ${
                      index === activeIndex
                        ? "w-7 bg-accent"
                        : "w-1.5 bg-fg/25 group-hover:bg-fg/50"
                    }`}
                  />
                </button>
              ))}
            </nav>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default ProjectGallery;
