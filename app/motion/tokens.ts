import type { Transition, Variants } from "motion/react";

export const ease = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const;

export const duration = {
  fast: 0.15,
  base: 0.25,
  slow: 0.45,
} as const;

export const spring = {
  snappy: { type: "spring", stiffness: 500, damping: 38, mass: 0.6 },
  layout: { type: "spring", stiffness: 170, damping: 26, mass: 0.9 },
} as const satisfies Record<string, Transition>;

export const fadeUp = (reduceMotion: boolean, distance = 8): Variants => ({
  hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.out },
  },
});

export const stagger = (step = 0.06, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: step, delayChildren: delay } },
});
