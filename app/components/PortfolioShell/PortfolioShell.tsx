"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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
import { useCursorGlow } from "../../hooks/useCursorGlow";
import { createHomeMotion } from "../../motion/homeMotion";

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
  const motionConfig = createHomeMotion(reduceMotion);
  const expanded = isWork || isExpandingToWork;

  useEffect(() => {
    if (!isExpandingToWork) return;

    if (!isWork) {
      const navigationTimer = window.setTimeout(
        () => router.push("/work", { scroll: false }),
        reduceMotion ? 80 : 520,
      );

      return () => window.clearTimeout(navigationTimer);
    }

    const revealTimer = window.setTimeout(
      () => setIsExpandingToWork(false),
      reduceMotion ? 20 : 300,
    );

    return () => window.clearTimeout(revealTimer);
  }, [isExpandingToWork, isWork, reduceMotion, router]);

  const handleNavigate = (
    href: string,
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
    const modifiedClick =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

    if (href === "/" && isExpandingToWork && !modifiedClick) {
      event.preventDefault();
      setIsExpandingToWork(false);
      return;
    }

    if (href !== "/work" || isWork || modifiedClick || event.button !== 0) {
      return;
    }

    event.preventDefault();
    setIsExpandingToWork(true);
  };

  const subtitleWords = useMemo(() => "Full-Stack Developer".split(" "), []);

  const shellTransition = reduceMotion
    ? { duration: 0.18 }
    : {
        type: "spring" as const,
        stiffness: 150,
        damping: 24,
        mass: 0.85,
      };

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
        <AnimatePresence>
          {!overlayOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                exit={{ opacity: 0 }}
                className="pointer-events-none fixed z-1 hidden h-140 w-140 rounded-full bg-[radial-gradient(circle,rgba(253,224,71,0.14)_0%,rgba(253,224,71,0.05)_35%,transparent_65%)] md:block"
                style={{
                  left: springX,
                  top: springY,
                  x: "-50%",
                  y: "-50%",
                }}
                aria-hidden="true"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                exit={{ opacity: 0 }}
                className="pointer-events-none fixed z-50 hidden h-3 w-3 rounded-full bg-yellow-300/70 shadow-lg shadow-yellow-300/30 md:block"
                style={{
                  left: springX,
                  top: springY,
                  x: "-50%",
                  y: "-50%",
                }}
                aria-hidden="true"
              />
            </>
          )}
        </AnimatePresence>

        <div
          className={`relative z-10 flex min-h-dvh items-center justify-center ${
            expanded ? "p-0" : "px-4 py-8 pb-28 md:px-6"
          }`}
        >
          <motion.section
            layout
            initial={{ borderRadius: expanded ? 0 : 12 }}
            animate={{ borderRadius: expanded ? 0 : 12 }}
            transition={shellTransition}
            className={`relative flex w-full flex-col overflow-hidden border border-white/5 bg-surface shadow-lg shadow-yellow-400/5 ${
              expanded ? "h-dvh max-w-none" : "max-w-2xl"
            }`}
          >
            <motion.header
              layout="position"
              className={`shrink-0 ${
                expanded
                  ? "px-5 py-4 md:px-8 md:py-5"
                  : "p-5 pb-4 md:p-6 md:pb-4"
              }`}
            >
              <motion.div
                variants={motionConfig.row}
                initial="hidden"
                animate="visible"
                className="flex items-center justify-between gap-3"
              >
                <div>
                  <p className="mb-1 text-sm text-white/50">Hello, I&apos;m</p>
                  <h1 className="text-3xl font-bold leading-none text-white md:text-4xl">
                    <GlitchNameHeading
                      primaryName="Theocharis"
                      altName="Pqteras"
                      motionConfig={motionConfig}
                      reduceMotion={reduceMotion}
                    />
                  </h1>
                </div>
                <Status />
              </motion.div>

              <motion.div
                variants={motionConfig.row}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-start justify-between gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center"
              >
                <motion.p
                  variants={motionConfig.subtitleContainer}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-wrap gap-x-1 text-sm text-white/60"
                >
                  {subtitleWords.map((word, index) => (
                    <motion.span
                      key={`${word}-${index}`}
                      variants={motionConfig.subtitleWord}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.p>
                <SocialIcons />
              </motion.div>
            </motion.header>

            <AnimatePresence mode="wait">
              <motion.main
                key={pathname}
                initial={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: isWork ? 18 : -10 }
                }
                animate={
                  isExpandingToWork
                    ? { opacity: 0, y: -10 }
                    : { opacity: 1, y: 0 }
                }
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: isWork ? -12 : 10 }
                }
                transition={{
                  duration: reduceMotion ? 0.12 : isWork ? 0.38 : 0.28,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={
                  isWork ? "min-h-0 flex-1" : "px-5 pb-5 md:px-6 md:pb-6"
                }
              >
                {children}
              </motion.main>
            </AnimatePresence>
          </motion.section>
        </div>

        <motion.div
          variants={motionConfig.dock}
          initial="hidden"
          animate="visible"
          className="fixed bottom-6 left-1/2 z-200 -translate-x-1/2 transform-gpu"
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
