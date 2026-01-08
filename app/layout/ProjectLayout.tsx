"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSwipeable } from "react-swipeable";
import { projects } from "../utils/projectData";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const ProjectLayout = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    trackMouse: true,
  });

  const handleNext = () => {
    if (currentIndex < projects.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  const currentProject = projects[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full"
      {...swipeHandlers}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-yellow-300">
          Projects & Work
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-2 rounded-md bg-[#151515] border border-white/10 text-white/60 hover:text-yellow-300 hover:border-yellow-400/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
            aria-label="Previous project"
          >
            <FaChevronLeft size={12} />
          </button>
          <span className="text-xs text-white/50 min-w-[2.5rem] text-center font-medium">
            {currentIndex + 1} / {projects.length}
          </span>
          <button
            onClick={handleNext}
            disabled={currentIndex === projects.length - 1}
            className="p-2 rounded-md bg-[#151515] border border-white/10 text-white/60 hover:text-yellow-300 hover:border-yellow-400/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
            aria-label="Next project"
          >
            <FaChevronRight size={12} />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg min-h-[200px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="p-4 rounded-lg bg-[#151515] border border-white/5"
          >
            <div className="flex items-start justify-between mb-3">
              <h4 className="text-lg font-semibold text-white">
                {currentProject.name}
              </h4>
              <div className="flex items-center gap-1.5">
                {currentProject.github_url && (
                  <a
                    href={currentProject.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md bg-white/5 border border-white/10 text-white/60 hover:text-yellow-300 hover:border-yellow-400/30 transition-all duration-300"
                    aria-label="View on GitHub"
                  >
                    <FaGithub size={14} />
                  </a>
                )}
                {currentProject.url && (
                  <a
                    href={currentProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 hover:bg-yellow-400/20 transition-all duration-300"
                    aria-label="Visit website"
                  >
                    <FaExternalLinkAlt size={12} />
                  </a>
                )}
              </div>
            </div>

            {currentProject.description && (
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                {currentProject.description}
              </p>
            )}

            <div className="flex items-center gap-2 pt-3 border-t border-white/5">
              <span className="text-xs text-white/40 uppercase tracking-wider font-medium">
                Stack
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {currentProject.techStack.map((tech, index) => (
                  <motion.img
                    key={index}
                    src={tech}
                    alt="Technology"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="h-6 w-6 p-0.5 rounded-md bg-white/5 border border-white/10"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-1.5 mt-4">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-5 bg-yellow-300"
                : "w-1.5 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectLayout;
