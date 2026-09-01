"use client";

import { useScroll, type MotionValue } from "motion/react";
import {
  createContext,
  useContext,
  type ReactNode,
  type RefObject,
} from "react";

type WorkScrollContextValue = {
  scrollContainer: RefObject<HTMLDivElement | null>;
  scrollYProgress: MotionValue<number>;
};

const WorkScrollContext = createContext<WorkScrollContextValue | null>(null);

type WorkScrollProviderProps = {
  scrollContainer: RefObject<HTMLDivElement | null>;
  isScrollContainerReady: boolean;
  children: ReactNode;
};

/**
 * Shares one scroll progress source for the work page scroll container.
 */
export const WorkScrollProvider = ({
  scrollContainer,
  isScrollContainerReady,
  children,
}: WorkScrollProviderProps) => {
  const { scrollYProgress } = useScroll(
    isScrollContainerReady ? { container: scrollContainer } : {},
  );

  return (
    <WorkScrollContext.Provider value={{ scrollContainer, scrollYProgress }}>
      {children}
    </WorkScrollContext.Provider>
  );
};

/**
 * Returns the shared work scroll container and progress value.
 */
export const useWorkScroll = () => {
  const context = useContext(WorkScrollContext);

  if (!context) {
    throw new Error("useWorkScroll must be used within WorkScrollProvider");
  }

  return context;
};
