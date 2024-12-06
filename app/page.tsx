"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Status from "./components/Status/Status";
import Tabs from "./components/Tabs/Tabs";
import SocialIcons from "./components/SocialIcons/SocialIcons";
import HomeLayout from "./layout/HomeLayout";
import ProjectLayout from "./layout/ProjectLayout";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState("home");
  const isInsideRef = useRef(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 10 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      if (isInsideRef.current || window.innerWidth < 768) return;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const newX = (e.clientX - centerX) * 0.035;
      const newY = (e.clientY - centerY) * 0.025;
      x.set(newX);
      y.set(newY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <>
      <motion.div className="mb-20 md:mb-0 max-w-[800px] m-auto min-h-screen lg:p-10 p-4 flex items-center justify-center">
        <motion.div
          onMouseEnter={() => (isInsideRef.current = true)}
          onMouseLeave={() => (isInsideRef.current = false)}
          style={{
            x: xSpring,
            y: ySpring,
            boxShadow: "2px 5px 5px rgba(253, 224, 71, 0.69)",
          }}
          className="flex flex-col gap-2 items-center justify-between p-6 md:p-8 bg-[#191919] rounded-xl"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-evenly w-full gap-4">
            <h1 className="font-bold select-none text-3xl md:text-4xl w-full text-nowrap items-center">
              Hey, I&apos;m{" "}
              <span className="cursor-grab text-yellow-300 hover:text-yellow-400 duration-300">
                Theocharis
              </span>
            </h1>
            <hr className="hidden md:block w-full border border-yellow-400 rounded-lg min-w-10" />
            <Status />
          </div>
          <div className="flex self-start w-full items-center space-x-2 mt-1.5 justify-between text-sm md:text-base">
            <p className="self-start">A wannabe Software Developer</p>
            <SocialIcons />
          </div>
          {selectedTab === "home" ? <HomeLayout /> : <ProjectLayout />}
        </motion.div>
      </motion.div>
      {/* Hub Buttons (Radio Buttons styling) */}
      <div className="w-max fixed bottom-2 md:bottom-8 left-1/2 transform -translate-x-1/2">
        <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>
    </>
  );
}
