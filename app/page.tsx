"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import Status from "./components/Status/Status";
import Tabs from "./components/Tabs/Tabs";
import SocialIcons from "./components/SocialIcons/SocialIcons";
import HomeLayout from "./layout/HomeLayout";
import ProjectLayout from "./layout/ProjectLayout";

const Home = () => {
  const [selectedTab, setSelectedTab] = useState("home");
  const [isClient, setIsClient] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      cursorX.set(window.innerWidth / 2);
      cursorY.set(window.innerHeight / 2);
    }
  }, [cursorX, cursorY]);

  useEffect(() => {
    if (!isClient) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;

      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(253, 224, 71, 0.06), transparent 40%)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isClient, cursorX, cursorY]);

  return (
    <>
      <div
        ref={glowRef}
        className="fixed inset-0 pointer-events-none z-0 hidden md:block"
      />

      {isClient && (
        <motion.div
          className="fixed w-3 h-3 rounded-full bg-yellow-300/70 pointer-events-none z-50 hidden md:block shadow-lg shadow-yellow-300/30"
          style={{
            left: springX,
            top: springY,
            x: "-50%",
            y: "-50%",
          }}
        />
      )}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-6 md:px-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full max-w-2xl mb-24"
        >
          <motion.div
            layout
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="relative p-5 md:p-6 rounded-xl bg-surface border border-white/5 shadow-lg shadow-yellow-400/5 overflow-hidden"
          >
            <div className="flex flex-row items-center sm:items-center justify-between gap-3">
              <div>
                <p className="text-white/50 text-sm mb-1">Hello, I&apos;m</p>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  <span className="text-yellow-300 hover:text-yellow-400 transition-colors duration-300 cursor-default">
                    Theocharis
                  </span>
                </h1>
              </div>
              <Status />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
              <p className="text-white/60 text-sm">
                A wannabe Software Developer
              </p>
              <SocialIcons />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {selectedTab === "home" ? <HomeLayout /> : <ProjectLayout />}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2"
        >
          <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </motion.div>
      </div>
    </>
  );
};

export default Home;
