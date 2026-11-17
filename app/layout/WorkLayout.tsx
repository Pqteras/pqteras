"use client";

import Lenis from "lenis";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import ProjectChapter, {
  workGutterClassName,
} from "../components/Work/ProjectChapter";
import ProjectGallery from "../components/Work/ProjectGallery";
import ProjectNavigator from "../components/Work/ProjectNavigator";
import {
  useWorkScroll,
  WorkScrollProvider,
} from "../context/WorkScrollContext";
import { useActiveWorkProject } from "../hooks/useActiveWorkProject";
import { useHydratedRef } from "../hooks/useHydratedRef";
import { ease, fadeUp } from "../motion/tokens";
import type { WorkItem, WorkItemId } from "../utils/workData";

type GalleryState = {
  item: WorkItem;
  activeIndex: number;
};

type WorkLayoutProps = {
  items: WorkItem[];
};

const HERO_HEADLINE = "Building useful things, one problem at a time.";

const heroVariants: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.25, staggerChildren: 0.05 } },
};

const getHeadlineWordVariants = (reduceMotion: boolean): Variants => ({
  hidden: reduceMotion ? { opacity: 0 } : { y: "110%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: reduceMotion ? 0.2 : 0.8, ease: ease.out },
  },
});

const WorkLayout = ({ items }: WorkLayoutProps) => {
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

  // Chapters live in their own scroll container, so #hash links are scrolled manually.
  const scrollToHashProject = useEffectEvent(() => {
    const id = window.location.hash.slice(1);
    if (items.some((item) => item.id === id)) {
      navigateToProject(id as WorkItemId);
    }
  });

  useEffect(() => {
    if (!isScrollReady) return;

    scrollToHashProject();
    window.addEventListener("hashchange", scrollToHashProject);
    return () => window.removeEventListener("hashchange", scrollToHashProject);
  }, [isScrollReady]);

  const handleNavigatorOpenChange = (open: boolean) => {
    if (open) lenisRef.current?.stop();
    else lenisRef.current?.start();
  };

  const setActiveIndex = (activeIndex: number) => {
    setGallery((current) => (current ? { ...current, activeIndex } : null));
  };

  return (
    <WorkScrollProvider
      scrollContainer={scrollContainer}
      isScrollContainerReady={isScrollReady}
    >
      <div className="relative h-full overflow-hidden">
        <MobileScrollProgress />

        <ProjectNavigator
          items={items}
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
            <WorkHero reduceMotion={reduceMotion} />

            {items.map((item, index) => (
              <ProjectChapter
                key={item.id}
                item={item}
                index={index}
                isScrollContainerReady={isScrollReady}
                onOpenGallery={(target) =>
                  setGallery({ item: target, activeIndex: 0 })
                }
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
        onClose={() => setGallery(null)}
      />
    </WorkScrollProvider>
  );
};

const MobileScrollProgress = () => {
  const { scrollYProgress } = useWorkScroll();

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-20 h-0.5 bg-line md:hidden"
      aria-hidden="true"
    >
      <motion.div
        style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
        className="h-full bg-accent"
      />
    </div>
  );
};

const WorkHero = ({ reduceMotion }: { reduceMotion: boolean }) => {
  const wordVariants = getHeadlineWordVariants(reduceMotion);
  const supportVariants = fadeUp(reduceMotion, 10);
  const words = HERO_HEADLINE.split(" ");

  return (
    <motion.section
      variants={heroVariants}
      initial="hidden"
      animate="visible"
      className={`mx-auto flex min-h-full max-w-6xl flex-col justify-center py-16 ${workGutterClassName}`}
    >
      <h2
        aria-label={HERO_HEADLINE}
        className="max-w-4xl text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.035em] text-fg sm:text-5xl md:text-6xl lg:text-7xl"
      >
        {words.map((word, index) => (
          <span key={index} aria-hidden="true">
            <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span variants={wordVariants} className="inline-block">
                {word}
              </motion.span>
            </span>
            {index < words.length - 1 && " "}
          </span>
        ))}
      </h2>
      <motion.p
        variants={supportVariants}
        className="mt-6 max-w-xl text-base leading-7 text-muted md:text-lg md:leading-8"
      >
        Web platforms, desktop applications, and community tools designed for
        real-world use.
      </motion.p>
    </motion.section>
  );
};

export default WorkLayout;
