import type { Variants } from "motion/react";
import { duration, ease, fadeUp } from "./tokens";

export const createHomeMotion = (reduceMotion: boolean) => {
  const row = fadeUp(reduceMotion, 6);

  const nameContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.03,
        delayChildren: reduceMotion ? 0 : 0.08,
      },
    },
  };

  const nameLetter: Variants = {
    hidden: reduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 6, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: reduceMotion ? 0.16 : 0.5, ease: ease.out },
    },
  };

  const dock: Variants = {
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration.slow,
        ease: ease.out,
        delay: reduceMotion ? 0 : 0.2,
      },
    },
  };

  return { row, nameContainer, nameLetter, dock };
};
