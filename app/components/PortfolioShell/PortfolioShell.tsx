"use client";

import { motion, useReducedMotion } from "motion/react";
import { ReactLenis } from "lenis/react";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
} from "react";
import GlitchNameHeading from "../GlitchNameHeading/GlitchNameHeading";
import SocialIcons from "../SocialIcons/SocialIcons";
import Status from "../Status/Status";
import Tabs from "../Tabs/Tabs";
import { useAppViewport } from "../../hooks/useAppViewport";
import { useCursorGlow } from "../../hooks/useCursorGlow";
import { createHomeMotion } from "../../motion/homeMotion";
import { duration, ease, spring } from "../../motion/tokens";

const PortfolioOverlayContext = createContext<(open: boolean) => void>(
  () => {},
);

export const usePortfolioOverlay = () => useContext(PortfolioOverlayContext);

type PortfolioShellProps = {
  children: React.ReactNode;
};

const PortfolioShell = ({ children }: PortfolioShellProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const isWork = pathname === "/work";
  const reduceMotion = useReducedMotion() ?? false;
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [isExpandingToWork, setIsExpandingToWork] = useState(false);
  const { isVisible, springX, springY } = useCursorGlow({
    enabled: !overlayOpen,
  });
  const motionConfig = useMemo(
    () => createHomeMotion(reduceMotion),
    [reduceMotion],
  );
  const expanded = isWork || isExpandingToWork;
  useAppViewport(expanded);

  useEffect(() => {
    if (!isExpandingToWork) return;

    if (!isWork) {
      const navigationTimer = window.setTimeout(
        () => router.push("/work", { scroll: false }),
        reduceMotion ? 80 : 480,
      );

      return () => window.clearTimeout(navigationTimer);
    }

    const revealTimer = window.setTimeout(
      () => setIsExpandingToWork(false),
      reduceMotion ? 20 : 280,
    );

    return () => window.clearTimeout(revealTimer);
  }, [isExpandingToWork, isWork, reduceMotion, router]);

  const handleNavigate = (
    href: string,
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
    const modifiedClick =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

    if (
      href !== "/work" &&
      isExpandingToWork &&
      !modifiedClick &&
      event.button === 0
    ) {
      setIsExpandingToWork(false);
      return;
    }

    if (href !== "/work" || isWork || modifiedClick || event.button !== 0) {
      return;
    }

    event.preventDefault();
    setIsExpandingToWork(true);
  };

  const shellTransition = reduceMotion ? { duration: 0.18 } : spring.layout;

  return (
    <ReactLenis
      root
      options={{
        anchors: true,
        autoRaf: true,
        allowNestedScroll: true,
        lerp: 0.085,
        stopInertiaOnNavigate: true,
      }}
    >
      <PortfolioOverlayContext.Provider value={setOverlayOpen}>
        <motion.div
          initial={false}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none fixed left-0 top-0 z-1 -ml-80 -mt-80 hidden size-160 rounded-full bg-[radial-gradient(circle,rgb(253_224_71/0.09)_0%,rgb(253_224_71/0.035)_32%,transparent_62%)] will-change-transform md:block"
          style={{ x: springX, y: springY }}
          aria-hidden="true"
        />

        <div
          className={`relative z-10 flex min-h-(--app-viewport-height) items-center justify-center ${
            expanded ? "p-0" : "px-4 py-8 pb-28 md:px-6"
          }`}
        >
          <motion.section
            layout
            layoutDependency={expanded}
            initial={{ borderRadius: expanded ? 0 : 16 }}
            animate={{ borderRadius: expanded ? 0 : 16 }}
            transition={shellTransition}
            className={`relative flex w-full flex-col overflow-hidden border border-line bg-surface shadow-[0_32px_64px_-32px_rgb(0_0_0/0.7)] ${
              expanded ? "h-(--app-viewport-height) max-w-none" : "max-w-2xl"
            }`}
          >
            <motion.header
              layout="position"
              layoutDependency={expanded}
              className={`shrink-0 ${
                expanded
                  ? "px-5 py-4 md:px-8 md:py-5"
                  : "p-5 pb-4 md:p-7 md:pb-5"
              }`}
            >
              <motion.div
                variants={motionConfig.row}
                initial="hidden"
                animate="visible"
                className="border-b border-line pb-4"
              >
                <div className="flex items-stretch justify-between gap-4">
                  <div className="min-w-0">
                    <p className="mb-1.5 text-sm text-muted">Hello, I&apos;m</p>
                    <h1 className="text-3xl font-bold leading-none tracking-[-0.02em] md:text-4xl">
                      <GlitchNameHeading
                        primaryName="Theocharis"
                        altName="Pqteras"
                        motionConfig={motionConfig}
                        reduceMotion={reduceMotion}
                      />
                    </h1>
                    <p className="mt-2 text-sm text-muted">Full-Stack Developer</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end justify-between gap-3">
                    <Status />
                    <SocialIcons className="-mb-2 -mr-2 hidden sm:flex" />
                  </div>
                </div>
                <SocialIcons className="-mx-2 mt-3 flex sm:hidden" />
              </motion.div>
            </motion.header>

            <motion.main
              key={pathname}
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: isWork ? 12 : 6 }
              }
              animate={
                isExpandingToWork
                  ? { opacity: 0, y: reduceMotion ? 0 : -6 }
                  : { opacity: 1, y: 0 }
              }
              transition={{
                duration: reduceMotion
                  ? duration.fast
                  : isWork
                    ? 0.4
                    : duration.base,
                ease: ease.out,
              }}
              className={
                isWork ? "min-h-0 flex-1" : "px-5 pb-6 pt-1 md:px-7 md:pb-7"
              }
            >
              {children}
            </motion.main>
          </motion.section>
        </div>

        <motion.div
          variants={motionConfig.dock}
          initial="hidden"
          animate="visible"
          className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] left-1/2 z-200 -translate-x-1/2 transform-gpu"
        >
          <Tabs
            activeHref={isExpandingToWork ? "/work" : pathname}
            onNavigate={handleNavigate}
          />
        </motion.div>
      </PortfolioOverlayContext.Provider>
    </ReactLenis>
  );
};

export default PortfolioShell;
