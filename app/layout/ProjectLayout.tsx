"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { projects } from "../utils/projectData";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function ProjectLayout() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    trackMouse: true,
  });

  const handleNext = () => {
    if (currentIndex < projects.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const toggleReadMore = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="mt-2 flex flex-col items-center w-full" {...swipeHandlers}>
      <h3 className="text-yellow-300 font-bold text-2xl mb-4 self-start">
        Projects - Work
      </h3>
      <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg overflow-hidden select-none">
        <motion.div
          className="flex"
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 30,
          }}
        >
          {projects.map((project, index) => (
            <div key={project.name} className="w-full flex-shrink-0 p-1">
              <div className="bg-[#151515] p-5 rounded-lg shadow-md h-full flex flex-col justify-between relative">
                <div>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-300 text-lg absolute top-4 right-4 hover:underline w-max"
                    >
                      <FaExternalLinkAlt />
                    </a>
                  )}
                  <h1 className="text-yellow-300 text-lg font-semibold">
                    {project.name}
                  </h1>
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-gray-500 text-sm hover:underline mt-2"
                    >
                      GitHub Repository
                    </a>
                  )}
                  <motion.div className="text-gray-400 text-sm mt-4" layout>
                    <AnimatePresence initial={false}>
                      {expandedIndex === index ? (
                        <motion.p
                          key="expanded"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 20,
                          }}
                        >
                          {project.description}
                        </motion.p>
                      ) : (
                        <motion.p
                          key="collapsed"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 20,
                          }}
                        >
                          {project.description &&
                          project.description.length > 150
                            ? `${project.description.slice(0, 150)}...`
                            : project.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  {project.description && project.description.length > 150 && (
                    <button
                      className="text-yellow-300 text-sm hover:underline mt-2"
                      onClick={() => toggleReadMore(index)}
                    >
                      {expandedIndex === index ? "Read Less" : "Read More"}
                    </button>
                  )}
                </div>
                <p className="text-gray-500 text-sm mt-2">
                  <span className="font-bold">Tech Stack:</span>{" "}
                  {project.techStack.map((tech, index) => (
                    <img
                      key={index}
                      src={tech}
                      alt={tech}
                      className="h-6 inline-block ml-1"
                    />
                  ))}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      {/* Pagination Dots */}
      <div className="mt-4 flex space-x-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full transition-colors duration-200 ${
              index === currentIndex ? "bg-yellow-300" : "bg-gray-500"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
