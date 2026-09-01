"use client";

import Lenis from "lenis";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import ProjectChapter from "../components/Work/ProjectChapter";
import ProjectGallery from "../components/Work/ProjectGallery";
import ProjectNavigator from "../components/Work/ProjectNavigator";
import {
  useWorkScroll,
  WorkScrollProvider,
} from "../context/WorkScrollContext";
import { useActiveWorkProject } from "../hooks/useActiveWorkProject";
import { useHydratedRef } from "../hooks/useHydratedRef";
import {
  workItems,
  type WorkItem,
  type WorkItemId,
} from "../utils/workData";

type GalleryState = {
  item: WorkItem;
  activeIndex: number;
};

const heroVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.28,
      staggerChildren: 0.1,
    },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const ScrollProgressLabel = () => {
  const { scrollYProgress } = useWorkScroll();
  const progressPercent = useTransform(scrollYProgress, (progress) =>
    Math.round(progress * 100),
  );
  const progressLabel = useMotionTemplate`${progressPercent}%`;

  return (
    <motion.span className="w-7 text-center text-[10px] tabular-nums text-white/35">
      {progressLabel}
    </motion.span>
  );
};

const WorkLayout = () => {
  const {
    ref: scrollContainer,
    setRef: setScrollContainerRef,
    isHydrated: isScrollContainerReady,
  } = useHydratedRef<HTMLDivElement>();
  const {
    ref: scrollContent,
    setRef: setScrollContentRef,
    isHydrated: isScrollContentReady,
  } = useHydratedRef<HTMLDivElement>();
  const lenisRef = useRef<Lenis | null>(null);
  const [gallery, setGallery] = useState<GalleryState | null>(null);
  const [activeProjectId, setActiveProjectId] =
    useState<WorkItemId | null>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const isScrollReady = isScrollContainerReady && isScrollContentReady;

  useActiveWorkProject({
    scrollContainer,
    isReady: isScrollReady,
    onActiveChange: setActiveProjectId,
  });

  useEffect(() => {
    if (!isScrollReady) return;

    const wrapper = scrollContainer.current;
    const content = scrollContent.current;
    if (!wrapper || !content) return;

    const desktopQuery = window.matchMedia("(min-width: 768px)");
    let lenis: Lenis | null = null;

    const destroyLenis = () => {
      if (!lenis) return;
      if (lenisRef.current === lenis) lenisRef.current = null;
      lenis.destroy();
      lenis = null;
    };

    const syncScrollEngine = () => {
      if (!desktopQuery.matches) {
        destroyLenis();
        return;
      }

      if (lenis) return;
      lenis = new Lenis({
        wrapper,
        content,
        autoRaf: true,
        gestureOrientation: "vertical",
        lerp: 0.085,
        orientation: "vertical",
        overscroll: false,
        smoothWheel: true,
      });
      lenisRef.current = lenis;
    };

    syncScrollEngine();
    desktopQuery.addEventListener("change", syncScrollEngine);

    return () => {
      desktopQuery.removeEventListener("change", syncScrollEngine);
      destroyLenis();
    };
  }, [isScrollReady, scrollContainer, scrollContent]);

  const navigateToProject = (id: WorkItemId) => {
    const target = scrollContent.current?.querySelector<HTMLElement>(
      `[data-work-project="${id}"]`,
    );
    if (!target) return;

    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, {
        immediate: reduceMotion,
        duration: reduceMotion ? undefined : 1.05,
        easing: (value) => 1 - Math.pow(1 - value, 4),
      });
      return;
    }

    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const handleNavigatorOpenChange = (open: boolean) => {
    if (open) lenisRef.current?.stop();
    else lenisRef.current?.start();
  };

  const openGallery = (item: WorkItem) => {
    setGallery({ item, activeIndex: 0 });
  };

  const closeGallery = () => {
    setGallery(null);
  };

  const setActiveIndex = (activeIndex: number) => {
    setGallery((current) => (current ? { ...current, activeIndex } : null));
  };

  return (
    <WorkScrollProvider
      scrollContainer={scrollContainer}
      isScrollContainerReady={isScrollReady}
    >
      <WorkLayoutScrollUI
        setScrollContainerRef={setScrollContainerRef}
        setScrollContentRef={setScrollContentRef}
        activeProjectId={activeProjectId}
        reduceMotion={reduceMotion}
        isScrollReady={isScrollReady}
        navigateToProject={navigateToProject}
        handleNavigatorOpenChange={handleNavigatorOpenChange}
        openGallery={openGallery}
        closeGallery={closeGallery}
        setActiveIndex={setActiveIndex}
        gallery={gallery}
      />
    </WorkScrollProvider>
  );
};

type WorkLayoutScrollUIProps = {
  setScrollContainerRef: ReturnType<typeof useHydratedRef<HTMLDivElement>>["setRef"];
  setScrollContentRef: ReturnType<typeof useHydratedRef<HTMLDivElement>>["setRef"];
  activeProjectId: WorkItemId | null;
  reduceMotion: boolean;
  isScrollReady: boolean;
  navigateToProject: (id: WorkItemId) => void;
  handleNavigatorOpenChange: (open: boolean) => void;
  openGallery: (item: WorkItem) => void;
  closeGallery: () => void;
  setActiveIndex: (activeIndex: number) => void;
  gallery: GalleryState | null;
};

const WorkLayoutScrollUI = ({
  setScrollContainerRef,
  setScrollContentRef,
  activeProjectId,
  reduceMotion,
  isScrollReady,
  navigateToProject,
  handleNavigatorOpenChange,
  openGallery,
  closeGallery,
  setActiveIndex,
  gallery,
}: WorkLayoutScrollUIProps) => {
  const { scrollYProgress } = useWorkScroll();

  return (
    <>
      <div className="relative h-full overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-0.5 bg-white/6 md:hidden"
          aria-hidden="true"
        >
          <motion.div
            style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            className="h-full bg-yellow-300"
          />
        </div>

        <div
          className="pointer-events-none absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-2 md:flex lg:right-5"
          aria-hidden="true"
        >
          <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/25">
            Progress
          </span>
          <div className="relative h-28 w-px overflow-hidden bg-white/10">
            <motion.div
              style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
              className="absolute inset-0 bg-yellow-300"
            />
          </div>
          <ScrollProgressLabel />
        </div>

        <ProjectNavigator
          items={workItems}
          activeId={activeProjectId}
          onSelect={navigateToProject}
          onMobileOpenChange={handleNavigatorOpenChange}
        />

        <div
          ref={setScrollContainerRef}
          data-scroll-container
          className="relative h-full touch-pan-y overflow-x-hidden overflow-y-auto overscroll-y-contain"
        >
          <div ref={setScrollContentRef} className="h-full overflow-x-clip">
            <motion.section
              variants={heroVariants}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              className="mx-auto flex min-h-full max-w-6xl flex-col justify-center py-12 pl-10 pr-5 md:px-10 md:py-16 lg:px-16"
            >
              <motion.p
                variants={heroItemVariants}
                className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-yellow-300/70"
              >
                Featured work
              </motion.p>
              <motion.h2
                variants={heroItemVariants}
                className="max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-white md:text-6xl"
              >
                Building useful things, one problem at a time.
              </motion.h2>
              <motion.div
                variants={heroItemVariants}
                className="mt-6 flex items-end justify-between gap-6"
              >
                <motion.p
                  variants={heroItemVariants}
                  className="max-w-2xl text-base leading-7 text-white/50 md:text-lg"
                >
                  Web platforms, desktop applications, and community tools
                  designed for real-world use.
                </motion.p>
                <motion.div
                  variants={heroItemVariants}
                  className="hidden items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/30 sm:flex"
                  aria-hidden="true"
                >
                  <motion.span
                    animate={reduceMotion ? undefined : { y: [0, 4, 0] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="flex items-center gap-2"
                  >
                    Scroll <FaChevronDown size={10} />
                  </motion.span>
                </motion.div>
              </motion.div>
            </motion.section>

            {workItems.map((item, index) => (
              <ProjectChapter
                key={item.id}
                item={item}
                index={index}
                total={workItems.length}
                isScrollContainerReady={isScrollReady}
                onOpenGallery={openGallery}
                priorityImage={index === 0}
              />
            ))}
          </div>
        </div>
      </div>

      <ProjectGallery
        item={gallery?.item ?? null}
        activeIndex={gallery?.activeIndex ?? 0}
        onActiveIndexChange={setActiveIndex}
        onClose={closeGallery}
      />
    </>
  );
};

export default WorkLayout;
