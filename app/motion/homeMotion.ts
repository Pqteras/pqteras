"use client";

import type { Variants } from "motion/react";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

export const splitToCharacters = (text: string) =>
  Array.from(text).map((char) => (char === " " ? "\u00A0" : char));

export const createHomeMotion = (reduceMotion: boolean) => {
  const shell: Variants = {
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.99 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: reduceMotion ? 0.2 : 0.62,
        ease: EASE_OUT,
      },
    },
  };

  // Overlapping, cohesive timing (no “wait then start” feel)
  const card: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.06,
        delayChildren: reduceMotion ? 0 : 0.02,
      },
    },
  };

  const row: Variants = {
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0.2 : 0.44,
        ease: EASE_OUT,
      },
    },
  };

  const nameContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.04,
        delayChildren: reduceMotion ? 0 : 0.12,
      },
    },
  };

  const nameLetter: Variants = {
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: reduceMotion ? 0.16 : 0.46,
        ease: EASE_SMOOTH,
      },
    },
  };

  const subtitleContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.03,
        delayChildren: reduceMotion ? 0 : 0.12,
      },
    },
  };

  const subtitleWord: Variants = {
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0.16 : 0.4,
        ease: EASE_OUT,
      },
    },
  };

  const tabPanel = {
    transition: reduceMotion
      ? { duration: 0.15 }
      : ({
        type: "spring" as const,
        stiffness: 220,
        damping: 26,
        mass: 0.75,
      } satisfies NonNullable<unknown>),
    variants: {
      initial: (dir: number) => {
        if (reduceMotion) return { opacity: 0 };
        if (dir === 0) return { opacity: 0, y: 12 };
        return { opacity: 0, x: dir > 0 ? 20 : -20 };
      },
      animate: reduceMotion
        ? { opacity: 1, transition: { duration: 0.2 } }
        : {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            type: "spring" as const,
            stiffness: 220,
            damping: 26,
            mass: 0.75,
          },
        },
      exit: (dir: number) => {
        if (reduceMotion) return { opacity: 0 };
        if (dir === 0) return { opacity: 0, y: -8 };
        return { opacity: 0, x: dir > 0 ? -16 : 16 };
      },
    } satisfies Variants,
  };

  const dock: Variants = {
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.99 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: reduceMotion ? 0.2 : 0.52,
        ease: EASE_OUT,
        delay: reduceMotion ? 0 : 0.12,
      },
    },
  };

  return {
    shell,
    card,
    row,
    nameContainer,
    nameLetter,
    subtitleContainer,
    subtitleWord,
    dock,
    tabPanel,
  };
};

