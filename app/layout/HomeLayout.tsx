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
        I&apos;m Theocharis Pasvantis, a {`${getAge()}-year-old `}full-stack
        developer based in Greece, currently in the final stage of my Computer
        Science degree at the University of Thessaly. I build web applications
        across the full stack, from the interface users interact with to the
        server, APIs, and databases behind it. I&apos;m most interested in
        projects that serve a clear, practical need, and I put as much care
        into how the code is structured as into what it does.
      </>
    ),
  },
  {
    id: "hobbies",
    title: "Hobbies",
    content: (
      <>
        Outside of development, I train regularly at the gym and play table
        tennis, a sport I enjoy for its speed and competitiveness. I also play
        video games to unwind. Staying active is a deliberate counterweight to
        the hours I spend at a desk.
      </>
    ),
  },
  {
    id: "knowledge",
    title: "Knowledge",
    content: (
      <>
        My primary language is{" "}
        <Links text="TypeScript" href="https://www.typescriptlang.org/" />. I
        build full-stack applications with{" "}
        <Links text="Next.js" href="https://nextjs.org/" /> and use{" "}
        <Links text="Vite" href="https://vite.dev/" /> for smaller projects. My
        experience covers both frontend and backend development, including API
        design, authentication, databases, and application security.{" "}
        <Links text="MongoDB" href="https://www.mongodb.com/" /> is the database
        I use most, and I&apos;m currently exploring{" "}
        <Links text="SQLCipher" href="https://www.zetetic.net/sqlcipher/" /> for
        encrypted local storage. Beyond the web, I develop desktop applications
        with <Links text="Electron.js" href="https://www.electronjs.org/" />,
        making full use of native system features.
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
