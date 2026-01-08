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
        enthusiast studying in Lamia, Greece. I&apos;m {getAge()} years old and
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

const HomeLayout = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-3"
    >
      {sections.map((section) => (
        <motion.div
          key={section.title}
          variants={itemVariants}
          className="group p-4 rounded-lg bg-surface-light border border-white/5 hover:border-yellow-400/20 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-md bg-yellow-400/10 text-yellow-300">
              <section.icon className="text-lg" />
            </div>
            <h3 className="text-lg font-semibold text-yellow-300">
              {section.title}
            </h3>
          </div>
          <p className="text-white/70 leading-relaxed text-sm">
            {section.content}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default HomeLayout;
