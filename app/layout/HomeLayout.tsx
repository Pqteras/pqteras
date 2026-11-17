"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import Links from "@/app/components/Links/Links";
import { ease, fadeUp, stagger } from "@/app/motion/tokens";
import { getAge } from "@/app/utils/helpers";

const sections = [
  {
    id: "about",
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
    id: "hobbies",
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
    id: "knowledge",
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

const getRuleVariants = (reduceMotion: boolean): Variants => ({
  hidden: reduceMotion ? { opacity: 0 } : { scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.9, ease: ease.out },
  },
});

const HomeLayout = () => {
  const reduceMotion = useReducedMotion() ?? false;
  const text = fadeUp(reduceMotion);
  const rule = getRuleVariants(reduceMotion);

  return (
    <motion.div
      variants={stagger(0.1, 0.1)}
      initial="hidden"
      animate="visible"
      className="flex flex-col"
    >
      {sections.map((section) => (
        <motion.section
          key={section.id}
          variants={stagger(0.05)}
          aria-labelledby={`${section.id}-heading`}
          className="group grid gap-x-8 gap-y-2 py-5 first:pt-3 last:pb-0 sm:grid-cols-[7.5rem_minmax(0,1fr)]"
        >
          <motion.div variants={text}>
            <h2
              id={`${section.id}-heading`}
              className="text-[15px] font-semibold leading-7 text-accent"
            >
              {section.title}
            </h2>
            <motion.span
              variants={rule}
              className="mt-1.5 block h-0.5 w-6 origin-left rounded-full bg-accent/70 transition-[width,background-color] duration-500 ease-out-expo group-hover:w-12 group-hover:bg-accent motion-reduce:transition-none"
              aria-hidden="true"
            />
          </motion.div>
          <motion.p
            variants={text}
            className="text-[15px] leading-7 text-fg/72"
          >
            {section.content}
          </motion.p>
        </motion.section>
      ))}
    </motion.div>
  );
};

export default HomeLayout;
