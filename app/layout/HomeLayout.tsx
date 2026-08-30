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
        I&apos;m Theocharis Pasvantis, a {`${getAge()}-year-old `}Full-Stack
        Developer from Greece, currently completing my Computer Science degree
        at the University of Thessaly. I focus on building modern web
        applications from end to end, from responsive interfaces to backend
        systems, APIs, and databases. I&apos;m especially interested in creating
        software that solves real problems and continuously improving the way I
        design, build, and ship it.
      </>
    ),
  },
  {
    icon: FaDumbbell,
    title: "Hobbies",
    content: (
      <>
        Outside of development, I spend a lot of time training at the gym and
        playing table tennis, which I particularly enjoy for its competitive and
        fast-paced nature. I also play video games when I want to unwind.
        Keeping a balance between building software and staying active is an
        important part of my everyday routine.
      </>
    ),
  },
  {
    icon: FaCode,
    title: "Knowledge",
    content: (
      <>
        I work primarily with{" "}
        <Links text="TypeScript" href="https://www.typescriptlang.org/" />,
        building full-stack applications with{" "}
        <Links text="Next.js" href="https://nextjs.org/" /> and using{" "}
        <Links text="Vite" href="https://vite.dev/" /> for lighter projects. My
        work covers frontend and backend development, APIs, authentication,
        databases, and secure application architecture. I work primarily with{" "}
        <Links text="MongoDB" href="https://www.mongodb.com/" />, while I&apos;m
        also exploring{" "}
        <Links text="SQLCipher" href="https://www.zetetic.net/sqlcipher/" /> for
        encrypted local storage. Beyond the web, I work extensively with{" "}
        <Links text="Electron.js" href="https://www.electronjs.org/" />,
        building complete desktop applications with native functionality.
      </>
    ),
  },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

const HomeLayout = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col mt-2"
    >
      {sections.map((section, index) => (
        <motion.div
          key={section.title}
          variants={itemVariants}
          className="group relative flex gap-4 pb-6 last:pb-0 will-change-transform"
        >
          <div className="flex w-9 shrink-0 flex-col items-center pt-0.5">
            <motion.div variants={iconVariants}>
              <section.icon className="text-lg text-yellow-300/90 transition-colors duration-300 group-hover:text-yellow-300" />
            </motion.div>
            {index < sections.length - 1 && (
              <span
                className="mt-3 w-px flex-1 bg-linear-to-b from-yellow-300/30 to-transparent"
                aria-hidden="true"
              />
            )}
          </div>
          <div className="pb-2">
            <h3 className="mb-1.5 text-sm font-semibold uppercase tracking-[0.15em] text-yellow-300">
              {section.title}
            </h3>
            <motion.p
              variants={descriptionVariants}
              className="text-white/70 leading-relaxed text-sm text-justify"
            >
              {section.content}
            </motion.p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default HomeLayout;
