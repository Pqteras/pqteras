"use client";

import { motion, Variants } from "motion/react";
import Links from "@/app/components/Links/Links";
import { getAge } from "@/app/utils/helpers";
import { FaCode, FaGamepad, FaGraduationCap } from "react-icons/fa";

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
    icon: FaGamepad,
    title: "Hobbies",
    content: (
      <>
        Alongside my computer science studies, I&apos;m deeply involved in
        hobbies like table tennis, video gaming, and fitness, which perfectly
        balance my passion for coding. I believe that combining work with
        personal interests creates a well-rounded and enjoyable life.
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
        <Links text="discord.js" href="https://discord.js.org/" />. I&apos;ve
        built a strong foundation in HTML and CSS and evolved into a skilled{" "}
        <Links text="React" href="https://reactjs.org/" /> developer. I&apos;m
        proficient in frameworks like{" "}
        <Links text="Vite" href="https://vitejs.dev/" />,{" "}
        <Links text="Next.js" href="https://nextjs.org/" />, and have hands-on
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
          className="group p-4 rounded-lg bg-[#151515] border border-white/5 hover:border-yellow-400/20 transition-all duration-300"
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
