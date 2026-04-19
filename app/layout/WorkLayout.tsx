"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { workItems } from "../utils/workData";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaChevronLeft,
  FaChevronRight,
  FaImages,
  FaTimes,
} from "react-icons/fa";
import { useSwipeable } from "react-swipeable";
import Image from "next/image";

const splitToCharacters = (text: string) =>
  Array.from(text).map((char) => (char === " " ? "\u00A0" : char));

const easeOut = [0.22, 1, 0.36, 1] as const;

/** Readable label for devicon SVG URLs used in `techStack` */
const DEVICON_SLUG_LABELS: Record<string, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  java: "Java",
  react: "React",
  nodejs: "Node.js",
  mongodb: "MongoDB",
  discordjs: "Discord.js",
  tailwindcss: "Tailwind CSS",
  sass: "Sass",
  vitejs: "Vite",
  nextjs: "Next.js",
  electron: "Electron",
};

const getTechLabelFromIconUrl = (iconUrl: string) => {
  const match = /\/icons\/([^/]+)\//.exec(iconUrl);
  const slug = match?.[1]?.toLowerCase() ?? "";
  if (slug && DEVICON_SLUG_LABELS[slug]) return DEVICON_SLUG_LABELS[slug];
  if (slug) {
    return slug
      .replace(/js$/i, "JS")
      .replace(/^([a-z])/i, (c) => c.toUpperCase());
  }
  return "Tech";
};

const getWorkItemInitials = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    const a = parts[0]?.[0];
    const b = parts[1]?.[0];
    if (a && b) return `${a}${b}`.toUpperCase();
  }
  const word = parts[0] ?? "?";
  return word.slice(0, 2).toUpperCase();
};

const characterContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.012,
      delayChildren: 0.08,
    },
  },
};

const characterVariants = {
  hidden: { opacity: 0, y: 7 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.26,
      ease: easeOut,
    },
  },
};

type WorkLayoutProps = {
  isIntroReady?: boolean;
};

type WorkLogoMarkProps = {
  name: string;
  logoUrl?: string;
  invertLogo?: boolean;
};

const WorkLogoMark = ({ name, logoUrl, invertLogo }: WorkLogoMarkProps) => {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [logoUrl, name]);

  const initials = getWorkItemInitials(name);
  const showImage = Boolean(logoUrl) && !imageFailed;

  return (
    <div
      className={`relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md sm:h-11 sm:w-11 ${
        showImage ? "" : "border border-white/5 bg-yellow-400/10"
      }`}
      aria-label={showImage ? undefined : `${name} work mark`}
    >
      {showImage ? (
        <Image
          width={44}
          height={44}
          src={logoUrl ?? ""}
          alt={`${name} logo`}
          className={`h-full w-full object-cover ${invertLogo ? "invert" : ""}`}
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span
          className="select-none text-sm font-semibold tracking-tight text-yellow-300 sm:text-base"
          aria-hidden
        >
          {initials}
        </span>
      )}
    </div>
  );
};

const WorkLayout = ({ isIntroReady = true }: WorkLayoutProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedScreenshots, setSelectedScreenshots] = useState<
    string[] | null
  >(null);
  const [activeScreenshotIndex, setActiveScreenshotIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isGalleryPortalReady, setIsGalleryPortalReady] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsGalleryPortalReady(true);
  }, []);

  useEffect(() => {
    if (!isExpanded && descriptionRef.current) {
      descriptionRef.current.scrollTop = 0;
    }
  }, [isExpanded]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    trackMouse: true,
  });

  const handleNext = () => {
    if (currentIndex < workItems.length - 1) {
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
        prev < selectedScreenshots.length - 1 ? prev + 1 : 0,
      );
    }
  };

  const handlePrevScreenshot = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedScreenshots) {
      setActiveScreenshotIndex((prev) =>
        prev > 0 ? prev - 1 : selectedScreenshots.length - 1,
      );
    }
  };

  const openGallery = (screenshots: string[]) => {
    setSelectedScreenshots(screenshots);
    setActiveScreenshotIndex(0);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 260 : -260,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -220 : 220,
      opacity: 0,
    }),
  };

  const currentWorkItem = workItems[currentIndex];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isIntroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
        {...swipeHandlers}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-yellow-300 overflow-hidden">
            <motion.span
              key="work-heading"
              variants={characterContainerVariants}
              initial="hidden"
              animate={isIntroReady ? "visible" : "hidden"}
              className="inline-flex"
            >
              {splitToCharacters("Work").map((character, index) => (
                <motion.span
                  key={`work-heading-${index}`}
                  variants={characterVariants}
                  className="inline-block"
                >
                  {character}
                </motion.span>
              ))}
            </motion.span>
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-2 rounded-md bg-surface-light border border-white/10 text-white/60 hover:text-yellow-300 hover:border-yellow-400/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
              aria-label="Previous work item"
            >
              <FaChevronLeft size={12} />
            </button>
            <span className="text-xs text-white/50 min-w-10 text-center font-medium">
              {currentIndex + 1} / {workItems.length}
            </span>
            <button
              onClick={handleNext}
              disabled={currentIndex === workItems.length - 1}
              className="p-2 rounded-md bg-surface-light border border-white/10 text-white/60 hover:text-yellow-300 hover:border-yellow-400/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
              aria-label="Next work item"
            >
              <FaChevronRight size={12} />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg h-60 bg-surface-light border border-white/5 transition-all duration-300 hover:border-yellow-400/20">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="p-4 h-full flex flex-col"
            >
              <div className="flex items-center gap-3 mb-1.5">
                <WorkLogoMark
                  key={`${currentWorkItem.name}-${currentWorkItem.logo ?? ""}`}
                  name={currentWorkItem.name}
                  logoUrl={currentWorkItem.logo}
                  invertLogo={currentWorkItem.invert_logo}
                />
                <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
                  <h4
                    className={`m-0 text-lg font-semibold leading-snug tracking-tight ${
                      currentWorkItem.title_color
                        ? currentWorkItem.title_color
                        : "text-yellow-300"
                    }`}
                  >
                    <motion.span
                      key={currentWorkItem.name}
                      variants={characterContainerVariants}
                      initial="hidden"
                      animate="visible"
                      className="inline-flex"
                    >
                      {splitToCharacters(currentWorkItem.name).map(
                        (character, index) => (
                          <motion.span
                            key={`${currentWorkItem.name}-${index}`}
                            variants={characterVariants}
                            className="inline-block"
                          >
                            {character}
                          </motion.span>
                        ),
                      )}
                    </motion.span>
                  </h4>
                  <div className="flex shrink-0 items-center gap-1.5">
                    {currentWorkItem.github_url && (
                      <a
                        href={currentWorkItem.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md bg-white/5 border border-white/10 text-white/60 hover:text-yellow-300 hover:border-yellow-400/30 transition-all duration-300"
                        aria-label="View on GitHub"
                      >
                        <FaGithub size={14} />
                      </a>
                    )}
                    {currentWorkItem.url && (
                      <a
                        href={currentWorkItem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 hover:bg-yellow-400/20 transition-all duration-300"
                        aria-label="Visit website"
                      >
                        <FaExternalLinkAlt size={12} />
                      </a>
                    )}
                    {currentWorkItem.screenshots && (
                      <button
                        type="button"
                        onClick={() =>
                          openGallery(currentWorkItem.screenshots!)
                        }
                        className="p-2 rounded-md bg-white/5 border border-white/10 text-white/60 hover:text-yellow-300 hover:border-yellow-400/30 transition-all duration-300"
                        aria-label="View screenshots"
                      >
                        <FaImages size={12} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {currentWorkItem.description && (
                <div className="relative flex-1 min-h-0 mb-3 group">
                  <motion.div
                    ref={descriptionRef}
                    className={`text-white/70 leading-relaxed text-sm ${
                      isExpanded
                        ? "h-full overflow-y-auto pr-2 desc-scroll"
                        : "line-clamp-4 overflow-hidden"
                    }`}
                  >
                    {currentWorkItem.description}
                  </motion.div>
                  {currentWorkItem.description.length > 150 && !isExpanded && (
                    <div className="absolute bottom-0 right-0 bg-linear-to-l from-surface-light pl-8 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsExpanded(true)}
                        className="text-xs font-medium text-yellow-300 hover:text-yellow-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/40 rounded-sm bg-surface-light/90 px-2 py-0.5"
                      >
                        Read more
                      </button>
                    </div>
                  )}
                  {isExpanded && (
                    <button
                      type="button"
                      onClick={() => setIsExpanded(false)}
                      className="absolute bottom-2 right-2 text-xs font-medium text-yellow-300 hover:text-yellow-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/40 z-10 bg-surface-light/95 backdrop-blur-sm px-2 py-1 rounded-md border border-white/10"
                    >
                      Close
                    </button>
                  )}
                </div>
              )}

              <div className="flex items-center gap-2 pt-3 border-t border-white/5 flex-none mt-auto">
                <span className="text-xs text-white/40 uppercase tracking-wider font-medium">
                  Stack
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {currentWorkItem.techStack.map((tech, index) => (
                    <motion.span
                      key={`${currentWorkItem.name}-tech-${index}`}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, ease: easeOut }}
                      title={getTechLabelFromIconUrl(tech)}
                      className="inline-flex items-center gap-1.5 rounded-md border border-white/5 bg-surface px-1.5 py-1"
                    >
                      <Image
                        src={tech}
                        alt=""
                        width={20}
                        height={20}
                        className="h-5 w-5 p-0.5 rounded-sm bg-white/5 object-contain"
                      />
                      <span className="hidden sm:inline text-[11px] text-white/65 max-w-24 truncate md:max-w-none">
                        {getTechLabelFromIconUrl(tech)}
                      </span>
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-1.5 mt-4">
          {workItems.map((_, index) => (
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
              aria-label={`Go to work item ${index + 1}`}
            />
          ))}
        </div>
      </motion.div>

      {isGalleryPortalReady &&
        createPortal(
          <AnimatePresence>
            {selectedScreenshots && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                role="dialog"
                aria-modal="true"
                aria-label="Screenshot gallery"
                className="fixed inset-0 z-300 flex items-center justify-center bg-black/95 backdrop-blur-md"
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
                    type="button"
                    onClick={() => setSelectedScreenshots(null)}
                    className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors z-50 backdrop-blur-sm"
                  >
                    <FaTimes size={24} />
                  </button>

                  <div className="relative w-full max-w-6xl flex-1 flex items-center justify-center rounded-2xl overflow-hidden mb-4">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeScreenshotIndex}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="relative max-h-[85vh] max-w-full"
                        >
                          <Image
                            src={selectedScreenshots[activeScreenshotIndex]}
                            alt={`Screenshot ${activeScreenshotIndex + 1}`}
                            width={1600}
                            height={900}
                            sizes="(max-width: 768px) 100vw, min(1152px, 90vw)"
                            className="max-h-[85vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {selectedScreenshots.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={handlePrevScreenshot}
                          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white/80 hover:text-white backdrop-blur-sm transition-all border border-white/10"
                        >
                          <FaChevronLeft size={24} />
                        </button>
                        <button
                          type="button"
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
                          type="button"
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
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
};

export default WorkLayout;
