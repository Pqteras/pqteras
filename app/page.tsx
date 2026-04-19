"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Status from "./components/Status/Status";
import Tabs from "./components/Tabs/Tabs";
import SocialIcons from "./components/SocialIcons/SocialIcons";
import HomeLayout from "./layout/HomeLayout";

import { useClientReady } from "./hooks/useClientReady";
import { useIntroGate } from "./hooks/useIntroGate";
import { useCursorGlow } from "./hooks/useCursorGlow";
import { createHomeMotion } from "./motion/homeMotion";
import WorkLayout from "./layout/WorkLayout";

const Home = () => {
  const [selectedTab, setSelectedTab] = useState("home");
  const prevTabRef = useRef<string>("home");
  const reduceMotion = useReducedMotion() ?? false;

  const isClient = useClientReady();
  const isIntroReady = useIntroGate(isClient);
  const { glowRef, springX, springY } = useCursorGlow({
    enabled: isClient,
    showGlow: true,
  });
  const motionConfig = createHomeMotion(reduceMotion);

  const headingLetters = useMemo(() => "Theocharis".split(""), []);
  const subtitleWords = useMemo(
    () => "A, soon to be, Software Developer".split(" "),
    [],
  );

  const tabDirection =
    selectedTab === "work" && prevTabRef.current === "home"
      ? 1
      : selectedTab === "home" && prevTabRef.current === "work"
        ? -1
        : 0;

  useEffect(() => {
    prevTabRef.current = selectedTab;
  }, [selectedTab]);

  if (!isClient) {
    return <div className="min-h-screen bg-transparent" aria-hidden="true" />;
  }

  return (
    <>
      <div
        ref={glowRef}
        className="fixed inset-0 pointer-events-none z-1 hidden md:block will-change-[background]"
        aria-hidden="true"
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
          variants={motionConfig.shell}
          initial="hidden"
          animate={isIntroReady ? "visible" : "hidden"}
          className={`w-full max-w-2xl mb-24 transform-gpu will-change-transform${!isIntroReady ? " pointer-events-none" : ""}`}
        >
          <motion.div
            layout="position"
            variants={motionConfig.card}
            initial="hidden"
            animate={isIntroReady ? "visible" : "hidden"}
            className="relative p-5 md:p-6 rounded-xl bg-surface border border-white/5 shadow-lg shadow-yellow-400/5 overflow-hidden"
          >
            <motion.div
              variants={motionConfig.row}
              className="flex flex-row items-center sm:items-center justify-between gap-3"
            >
              <div>
                <p className="text-white/50 text-sm mb-1">Hello, I&apos;m</p>
                <h1 className="text-3xl md:text-4xl font-bold text-white overflow-hidden">
                  <motion.span
                    variants={motionConfig.nameContainer}
                    initial="hidden"
                    animate={isIntroReady ? "visible" : "hidden"}
                    className="inline-flex text-yellow-300 hover:text-yellow-400 transition-colors duration-300 cursor-default"
                  >
                    {headingLetters.map((letter, index) => (
                      <motion.span
                        key={`${letter}-${index}`}
                        variants={motionConfig.nameLetter}
                        className="inline-block"
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </motion.span>
                </h1>
              </div>
              <Status isIntroReady={isIntroReady} />
            </motion.div>

            <motion.div
              variants={motionConfig.row}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10"
            >
              <motion.p
                variants={motionConfig.subtitleContainer}
                initial="hidden"
                animate={isIntroReady ? "visible" : "hidden"}
                className="text-white/60 text-sm flex flex-wrap gap-x-1"
              >
                {subtitleWords.map((word, index) => (
                  <motion.span
                    key={`${word}-${index}`}
                    variants={motionConfig.subtitleWord}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
              <SocialIcons isIntroReady={isIntroReady} />
            </motion.div>

            <motion.div variants={motionConfig.row} className="relative">
              <AnimatePresence mode="wait" custom={tabDirection}>
                <motion.div
                  key={selectedTab}
                  role="tabpanel"
                  aria-label={selectedTab === "home" ? "Home" : "Work"}
                  custom={tabDirection}
                  variants={motionConfig.tabPanel.variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {selectedTab === "home" ? (
                    <HomeLayout isIntroReady={isIntroReady} />
                  ) : (
                    <WorkLayout isIntroReady={isIntroReady} />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={motionConfig.dock}
          initial="hidden"
          animate={isIntroReady ? "visible" : "hidden"}
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 transform-gpu${!isIntroReady ? " pointer-events-none" : ""}`}
        >
          <Tabs
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            isIntroReady={isIntroReady}
          />
        </motion.div>
      </div>
    </>
  );
};

export default Home;
