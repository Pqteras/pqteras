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
  FaImages,
  FaTimes,
} from "react-icons/fa";

const ProjectLayout = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedScreenshots, setSelectedScreenshots] = useState<
    string[] | null
  >(null);
  const [activeScreenshotIndex, setActiveScreenshotIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    trackMouse: true,
  });

  const handleNext = () => {
    if (currentIndex < projects.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
      setIsExpanded(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
      setIsExpanded(false);
    }
  };

  const handleNextScreenshot = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedScreenshots) {
      setActiveScreenshotIndex((prev) =>
        prev < selectedScreenshots.length - 1 ? prev + 1 : 0
      );
    }
  };

  const handlePrevScreenshot = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedScreenshots) {
      setActiveScreenshotIndex((prev) =>
        prev > 0 ? prev - 1 : selectedScreenshots.length - 1
      );
    }
  };

  const openGallery = (screenshots: string[]) => {
    setSelectedScreenshots(screenshots);
    setActiveScreenshotIndex(0);
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
            className="p-2 rounded-md bg-surface-light border border-white/10 text-white/60 hover:text-yellow-300 hover:border-yellow-400/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
            aria-label="Previous project"
          >
            <FaChevronLeft size={12} />
          </button>
          <span className="text-xs text-white/50 min-w-10 text-center font-medium">
            {currentIndex + 1} / {projects.length}
          </span>
          <button
            onClick={handleNext}
            disabled={currentIndex === projects.length - 1}
            className="p-2 rounded-md bg-surface-light border border-white/10 text-white/60 hover:text-yellow-300 hover:border-yellow-400/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
            aria-label="Next project"
          >
            <FaChevronRight size={12} />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg h-60 bg-surface-light border border-white/5">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="p-4"
          >
            <div className="flex items-start justify-between mb-2">
              <h4
                className={`text-lg font-semibold ${
                  currentProject.title_color
                    ? currentProject.title_color
                    : "text-white"
                }`}
              >
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
                {currentProject.screenshots && (
                  <button
                    onClick={() => openGallery(currentProject.screenshots!)}
                    className="p-2 rounded-md bg-blue-400/10 border border-blue-400/30 text-blue-300 hover:bg-blue-400/20 transition-all duration-300"
                    aria-label="View screenshots"
                  >
                    <FaImages size={12} />
                  </button>
                )}
              </div>
            </div>

            {currentProject.description && (
              <div className="relative mb-4">
                <motion.div
                  animate={{ height: isExpanded ? "auto" : "4.25rem" }}
                  className={`text-white/60 text-sm leading-relaxed overflow-hidden ${
                    !isExpanded ? "line-clamp-4" : ""
                  }`}
                >
                  {currentProject.description}
                </motion.div>
                {currentProject.description.length > 150 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-1 text-xs font-medium text-yellow-300 hover:text-yellow-400 hover:underline focus:outline-none"
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                  </button>
                )}
              </div>
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
              setIsExpanded(false);
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

      <AnimatePresence>
        {selectedScreenshots && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedScreenshots(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-8"
            >
              <button
                onClick={() => setSelectedScreenshots(null)}
                className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors z-50 backdrop-blur-sm"
              >
                <FaTimes size={24} />
              </button>

              <div className="relative w-full max-w-6xl flex-1 flex items-center justify-center rounded-2xl overflow-hidden mb-4">
                <div className="relative w-full h-full flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeScreenshotIndex}
                      src={selectedScreenshots[activeScreenshotIndex]}
                      alt={`Screenshot ${activeScreenshotIndex + 1}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                    />
                  </AnimatePresence>
                </div>

                {selectedScreenshots.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevScreenshot}
                      className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white/80 hover:text-white backdrop-blur-sm transition-all border border-white/10"
                    >
                      <FaChevronLeft size={24} />
                    </button>
                    <button
                      onClick={handleNextScreenshot}
                      className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white/80 hover:text-white backdrop-blur-sm transition-all border border-white/10"
                    >
                      <FaChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>

              {selectedScreenshots.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto max-w-full p-2">
                  {selectedScreenshots.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveScreenshotIndex(idx);
                      }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === activeScreenshotIndex
                          ? "w-8 bg-white"
                          : "w-2 bg-white/30 hover:bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectLayout;
