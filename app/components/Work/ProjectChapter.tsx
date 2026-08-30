"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { type RefObject } from "react";
import { FaExternalLinkAlt, FaGithub, FaImages } from "react-icons/fa";
import { useHydratedRef } from "../../hooks/useHydratedRef";
import type { WorkItem } from "../../utils/workData";

type ProjectChapterProps = {
  item: WorkItem;
  index: number;
  total: number;
  scrollContainer: RefObject<HTMLDivElement | null>;
  isScrollContainerReady: boolean;
  onOpenGallery: (item: WorkItem) => void;
};

const easeOut = [0.22, 1, 0.36, 1] as const;

const contentVariants = {
  hidden: (direction: number) => ({ opacity: 0, x: direction * 44 }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease: easeOut,
      delayChildren: 0.08,
      staggerChildren: 0.075,
    },
  },
};

const mediaVariants = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction * -52,
    scale: 0.94,
  }),
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.85,
      ease: easeOut,
      delayChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

const listVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.045 },
  },
};

const chipVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: easeOut },
  },
};

const getInitials = (name: string) =>
  name
    .split(/\s|\./)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const ProjectMark = ({
  item,
  large = false,
}: {
  item: WorkItem;
  large?: boolean;
}) => (
  <motion.div
    variants={itemVariants}
    className={`relative grid shrink-0 place-items-center ${
      large ? "h-24 w-24 md:h-32 md:w-32" : "h-12 w-12"
    }`}
  >
    {item.logo ? (
      <Image
        src={item.logo}
        alt={`${item.name} logo`}
        width={large ? 128 : 48}
        height={large ? 128 : 48}
        className={`h-full w-full object-contain ${item.invertLogo ? "invert" : ""}`}
      />
    ) : (
      <span
        className={`font-semibold text-yellow-300 ${large ? "text-3xl" : "text-sm"}`}
        aria-label={`${item.name} initials`}
      >
        {getInitials(item.name)}
      </span>
    )}
  </motion.div>
);

const ProjectChapter = ({
  item,
  index,
  total,
  scrollContainer,
  isScrollContainerReady,
  onOpenGallery,
}: ProjectChapterProps) => {
  const {
    ref: chapterRef,
    setRef: setChapterRef,
    isHydrated: isChapterReady,
  } = useHydratedRef<HTMLElement>();
  const reduceMotion = useReducedMotion() ?? false;
  const direction = index % 2 ? 1 : -1;
  const canTrackScroll = isScrollContainerReady && isChapterReady;
  const { scrollYProgress } = useScroll(
    canTrackScroll
      ? {
          container: scrollContainer,
          target: chapterRef,
          offset: ["start end", "end start"],
        }
      : {},
  );
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [56, 0, 0, -36]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.98, 1, 1, 0.985],
  );
  const scrollMotionStyle =
    canTrackScroll && !reduceMotion ? { y, scale } : undefined;
  const headingId = `project-${item.id}-heading`;
  const preview = item.screenshots?.[0];
  const viewport = isScrollContainerReady
    ? ({ root: scrollContainer, once: true, amount: 0.22 } as const)
    : ({ once: true, amount: 0.22 } as const);

  return (
    <motion.article
      ref={setChapterRef}
      id={`work-project-${item.id}`}
      data-work-project={item.id}
      aria-labelledby={headingId}
      style={scrollMotionStyle}
      className="mx-auto flex min-h-[calc(var(--app-viewport-height)-9rem)] w-full max-w-6xl items-center py-16 pl-10 pr-5 md:px-10 lg:px-16"
    >
      <div className="grid w-full items-center gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12 lg:gap-20">
        <motion.div
          custom={direction}
          variants={contentVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={viewport}
          className={index % 2 ? "md:order-2" : undefined}
        >
          <motion.div
            variants={itemVariants}
            className="mb-6 flex items-center gap-4"
          >
            <ProjectMark item={item} />
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/35">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </p>
              <h2
                id={headingId}
                className={`text-3xl font-semibold tracking-tight md:text-4xl ${item.accent}`}
              >
                {item.name}
              </h2>
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="max-w-xl text-base leading-7 text-white/65 md:text-lg md:leading-8"
          >
            {item.description}
          </motion.p>

          <motion.ul
            variants={listVariants}
            className="mt-7 flex flex-wrap gap-2"
            aria-label={`${item.name} technologies`}
          >
            {item.technologies.map((technology) => (
              <motion.li
                key={technology.name}
                variants={chipVariants}
                className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/3 px-2.5 py-1.5 text-xs text-white/65"
              >
                <Image
                  src={technology.icon}
                  alt=""
                  width={18}
                  height={18}
                  className="h-4.5 w-4.5 object-contain"
                />
                {technology.name}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            variants={listVariants}
            className="mt-7 flex flex-wrap gap-2"
          >
            {item.website && (
              <motion.a
                variants={chipVariants}
                whileTap={{ scale: 0.98 }}
                href={item.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-yellow-300/25 bg-yellow-300/10 px-3 py-2 text-sm font-medium text-yellow-300 hover:bg-yellow-300/15"
              >
                Visit project <FaExternalLinkAlt size={11} />
              </motion.a>
            )}
            {item.repository && (
              <motion.a
                variants={chipVariants}
                whileTap={{ scale: 0.98 }}
                href={item.repository}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/4 px-3 py-2 text-sm font-medium text-white/70 hover:border-yellow-300/25 hover:text-yellow-300"
              >
                Source <FaGithub size={14} />
              </motion.a>
            )}
            {item.screenshots && (
              <motion.button
                variants={chipVariants}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => onOpenGallery(item)}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/4 px-3 py-2 text-sm font-medium text-white/70 hover:border-yellow-300/25 hover:text-yellow-300"
              >
                Gallery <FaImages size={13} />
              </motion.button>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          custom={direction}
          variants={mediaVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={viewport}
          className={index % 2 ? "md:order-1" : undefined}
        >
          {preview ? (
            <motion.button
              variants={itemVariants}
              whileTap={{ scale: 0.99 }}
              type="button"
              onClick={() => onOpenGallery(item)}
              aria-label={`Open ${item.name} screenshot gallery`}
              className="relative block aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f0f] shadow-2xl shadow-black/30 hover:border-yellow-300/25"
            >
              <Image
                src={preview}
                alt={`${item.name} project preview`}
                fill
                sizes="(max-width: 768px) 100vw, 52vw"
                className="object-cover"
              />
              <motion.span
                variants={itemVariants}
                className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-linear-to-t from-black/85 to-transparent px-4 pb-4 pt-12 text-left text-sm text-white/70"
              >
                View Gallery
                <FaImages className="text-yellow-300" />
              </motion.span>
            </motion.button>
          ) : (
            <motion.div
              variants={itemVariants}
              className="grid aspect-4/3 w-full place-items-center"
            >
              <div className="flex flex-col items-center gap-5">
                <ProjectMark item={item} large />
                <motion.span
                  variants={itemVariants}
                  className="text-xs font-medium uppercase tracking-[0.24em] text-white/30"
                >
                  Featured project
                </motion.span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.article>
  );
};

export default ProjectChapter;
