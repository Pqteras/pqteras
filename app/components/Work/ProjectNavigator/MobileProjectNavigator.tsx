"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { KeyboardEvent } from "react";
import { FaChevronRight, FaTimes } from "react-icons/fa";
import ProjectIcon from "./ProjectIcon";
import type { ProjectNavigatorProps } from "./types";
import useMobileProjectTray from "./useMobileProjectTray";
import { getNavigationTarget } from "./utils";

type MobileProjectNavigatorProps = ProjectNavigatorProps;

const MobileProjectNavigator = ({
  items,
  activeId,
  onSelect,
  onMobileOpenChange,
}: MobileProjectNavigatorProps) => {
  const reduceMotion = useReducedMotion() ?? false;
  const activeIndex = items.findIndex((item) => item.id === activeId);
  const { open, openTray, closeTray, triggerRef, panelRef, itemRefs } =
    useMobileProjectTray({
      activeIndex,
      onOpenChange: onMobileOpenChange,
    });

  const handleItemKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const targetIndex = getNavigationTarget(event.key, index, items.length);
    if (targetIndex === null) return;

    event.preventDefault();
    itemRefs.current[targetIndex]?.focus();
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openTray}
        aria-expanded={open}
        aria-controls="project-navigation-tray"
        aria-label="Open project navigator"
        className="absolute -left-2 top-1/2 z-30 flex h-14 w-7 -translate-y-1/2 items-center justify-end rounded-r-2xl bg-[#242424]/95 pr-1.5 text-white/60 shadow-lg shadow-black/25 backdrop-blur-md md:hidden"
      >
        <span className="flex flex-col items-end gap-1" aria-hidden="true">
          <span className="h-0.5 w-2 rounded-full bg-white/30" />
          <span className="h-0.5 w-4 rounded-full bg-yellow-300" />
          <span className="h-0.5 w-2.5 rounded-full bg-white/30" />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="project-navigation-tray"
            className="absolute inset-0 z-40 md:hidden"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
            <button
              type="button"
              onClick={closeTray}
              aria-label="Close project navigator"
              className="absolute inset-0 bg-black/58 backdrop-blur-[2px]"
            />
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-navigation-title"
              initial={
                reduceMotion ? false : { opacity: 0, x: -24, scale: 0.98 }
              }
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: -20, scale: 0.98 }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 340, damping: 30, mass: 0.72 }
              }
              className="absolute bottom-[calc(5.5rem+env(safe-area-inset-bottom))] left-1.5 top-2 flex w-[min(72vw,17rem)] flex-col overflow-hidden rounded-2xl bg-[#202020]/98 shadow-2xl shadow-black/50 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between px-4 pb-2 pt-3.5">
                <div>
                  <p
                    id="project-navigation-title"
                    className="text-sm font-semibold text-white"
                  >
                    Projects
                  </p>
                  <p className="mt-0.5 text-[11px] text-white/38">
                    Jump to a project
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeTray}
                  aria-label="Close project navigator"
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/4 text-white/55 transition-colors hover:bg-white/8 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300"
                >
                  <FaTimes size={14} />
                </button>
              </div>

              <nav
                aria-label="Projects"
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2"
              >
                {items.map((item, index) => {
                  const active = item.id === activeId;

                  return (
                    <button
                      key={item.id}
                      ref={(node) => {
                        itemRefs.current[index] = node;
                      }}
                      type="button"
                      aria-current={active ? "location" : undefined}
                      onKeyDown={(event) => handleItemKeyDown(event, index)}
                      onClick={() => {
                        closeTray();
                        onSelect(item.id);
                      }}
                      className={`mb-1 flex min-h-14 w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left outline-none transition-colors last:mb-0 focus-visible:ring-2 focus-visible:ring-yellow-300/70 ${
                        active
                          ? "bg-yellow-300/9 text-white"
                          : "text-white/62 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <ProjectIcon item={item} size="medium" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">
                          {item.name}
                        </span>
                        <span className="mt-0.5 block text-[10px] tabular-nums text-white/30">
                          {String(index + 1).padStart(2, "0")} /{" "}
                          {String(items.length).padStart(2, "0")}
                        </span>
                      </span>
                      <FaChevronRight
                        size={10}
                        className={active ? "text-yellow-300" : "text-white/20"}
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileProjectNavigator;
