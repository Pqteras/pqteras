"use client";

import { motion, Variants } from "motion/react";
import Links from "@/app/components/Links/Links";
import { getAge } from "@/app/utils/helpers";
import { FaCode, FaGraduationCap } from "react-icons/fa";
import { FaDumbbell } from "react-icons/fa6";

const sections = [
  {
    icon: FaGraduationCap,
    title: "About Me",
    content: (
      <>
        Greetings! My name is Theocharis Pasvantis, a computer science
        enthusiast studying in Lamia, Greece. I&apos;m{" "}
        {`${getAge()} years old and `}
        love diving into the exciting world of technology. I&apos;m always eager
        to learn new things, explore cool ideas, and grow my skills along the
        way!
      </>
    ),
  },
  {
    icon: FaDumbbell,
    title: "Hobbies",
    content: (
      <>
        Alongside my computer science studies, I train at the gym regularly and
        take fitness seriously, it keeps my routine disciplined and my head
        clear. I&apos;m also very good at table tennis and enjoy the
        competitive, fast-paced nature of the game. When I want to unwind,
        I&apos;ll play video games, but overall I like keeping a balance between
        building software and staying active.
      </>
    ),
  },
  {
    icon: FaCode,
    title: "Knowledge",
    content: (
      <>
        My coding journey started with JavaScript and TypeScript, driven by
        Discord projects using{" "}
        <Links text="discord.js" href="https://discord.js.org/" />. Over time, I
        built a strong foundation in HTML and CSS and became comfortable working
        with <Links text="React" href="https://reactjs.org/" />. Today, I’m very
        strong with <Links text="Next.js" href="https://nextjs.org/" />,
        building full-stack applications with modern routing patterns, server
        components, and production-ready architecture. I also have hands-on
        experience with{" "}
        <Links text="Electron.js" href="https://www.electronjs.org/" />.
      </>
    ),
  },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

const splitToCharacters = (text: string) =>
  Array.from(text).map((char) => (char === " " ? "\u00A0" : char));

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // hard-sequenced: next card starts after previous one completes
      // overlapped composition: cards breathe but flow together
      staggerChildren: 0.18,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeOut,
      when: "beforeChildren",
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const iconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.34,
      ease: easeOut,
    },
  },
};

const titleContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.02,
    },
  },
};

const titleCharacterVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.36,
      ease: easeOut,
    },
  },
};

const descriptionVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: easeOut,
    },
  },
};

type HomeLayoutProps = {
  /** Sync with page intro gate so SSR HTML does not flash full cards before Motion. */
  isIntroReady?: boolean;
};

const HomeLayout = ({ isIntroReady = true }: HomeLayoutProps) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isIntroReady ? "visible" : "hidden"}
      className="flex flex-col gap-3"
    >
      {sections.map((section) => (
        <motion.div
          key={section.title}
          variants={itemVariants}
          className="group p-4 rounded-lg bg-surface-light border border-white/5 hover:border-yellow-400/20 transition-all duration-300 will-change-transform"
        >
          <div className="flex items-center gap-3 mb-2">
            <motion.div
              variants={iconVariants}
              className="p-2 rounded-md bg-yellow-400/10 text-yellow-300"
            >
              <section.icon className="text-lg" />
            </motion.div>
            <h3 className="text-lg font-semibold text-yellow-300 overflow-hidden">
              <motion.span
                variants={titleContainerVariants}
                className="inline-flex"
              >
                {splitToCharacters(section.title).map(
                  (character, charIndex) => (
                    <motion.span
                      key={`${section.title}-${charIndex}`}
                      variants={titleCharacterVariants}
                      className="inline-block"
                    >
                      {character}
                    </motion.span>
                  ),
                )}
              </motion.span>
            </h3>
          </div>
          <motion.p
            variants={descriptionVariants}
            className="text-white/70 leading-relaxed text-sm"
          >
            {section.content}
          </motion.p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default HomeLayout;
