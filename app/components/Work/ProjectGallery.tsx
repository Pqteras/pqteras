"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { usePortfolioOverlay } from "../PortfolioShell/PortfolioShell";
import type { WorkItem } from "../../utils/workData";

type ProjectGalleryProps = {
  item: WorkItem | null;
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  onClose: () => void;
};

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
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const setOverlayOpen = usePortfolioOverlay();
  const reduceMotion = useReducedMotion() ?? false;
  const screenshots = item?.screenshots ?? [];

  const showPrevious = useCallback(() => {
    onActiveIndexChange(activeIndex === 0 ? screenshots.length - 1 : activeIndex - 1);
  }, [activeIndex, onActiveIndexChange, screenshots.length]);

  const showNext = useCallback(() => {
    onActiveIndexChange(activeIndex === screenshots.length - 1 ? 0 : activeIndex + 1);
  }, [activeIndex, onActiveIndexChange, screenshots.length]);

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
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && screenshots.length > 1) showPrevious();
      if (event.key === "ArrowRight" && screenshots.length > 1) showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [item, onClose, screenshots.length, showNext, showPrevious]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {item && screenshots.length > 0 && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-300 flex flex-col bg-[#0a0a0a]"
        >
          <header className="flex shrink-0 items-center justify-between border-b border-white/8 px-4 py-3 md:px-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/35">Project gallery</p>
              <h2 id="gallery-title" className="mt-1 text-base font-medium text-white/85">
                {item.name}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm tabular-nums text-white/45">
                {activeIndex + 1} / {screenshots.length}
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-[#181818] text-white/70 transition-colors hover:border-yellow-300/25 hover:text-yellow-300"
                aria-label="Close project gallery"
              >
                <FaTimes size={17} />
              </button>
            </div>
          </header>

          <div
            className="relative flex min-h-0 flex-1 items-center justify-center p-4 md:px-20 md:py-6"
            onClick={(event) => event.stopPropagation()}
          >
            <motion.div
              key={screenshots[activeIndex]}
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reduceMotion ? 0.1 : 0.22 }}
              className="relative max-h-full max-w-full"
            >
              <Image
                src={screenshots[activeIndex]}
                alt={`${item.name} screenshot ${activeIndex + 1}`}
                width={1600}
                height={900}
                sizes="(max-width: 768px) 100vw, 90vw"
                loading="eager"
                className="max-h-[calc(100dvh-10rem)] w-auto max-w-full rounded-xl object-contain shadow-2xl shadow-black/50"
              />
            </motion.div>

            {screenshots.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  className="absolute left-3 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-[#181818] text-white/70 transition-colors hover:border-yellow-300/25 hover:text-yellow-300 md:left-6"
                  aria-label="Previous screenshot"
                >
                  <FaChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-3 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-[#181818] text-white/70 transition-colors hover:border-yellow-300/25 hover:text-yellow-300 md:right-6"
                  aria-label="Next screenshot"
                >
                  <FaChevronRight size={16} />
                </button>
              </>
            )}
          </div>

          {screenshots.length > 1 && (
            <nav className="flex shrink-0 justify-center gap-2 px-4 pb-5" aria-label="Choose screenshot">
              {screenshots.map((screenshot, index) => (
                <button
                  key={screenshot}
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onActiveIndexChange(index);
                  }}
                  className={`h-1.5 rounded-full transition-[width,background-color] ${
                    index === activeIndex ? "w-8 bg-yellow-300" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Show screenshot ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                />
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
