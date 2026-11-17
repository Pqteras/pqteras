"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import {
  FiArrowUpRight,
  FiCheck,
  FiImage,
  FiLink,
  FiMaximize2,
} from "react-icons/fi";
import { useWorkScroll } from "../../context/WorkScrollContext";
import { ease } from "../../motion/tokens";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import {
  getInitials,
  getWorkLogoClassName,
  type WorkItem,
} from "../../utils/workData";

type ProjectChapterProps = {
  item: WorkItem;
  index: number;
  isScrollContainerReady: boolean;
  onOpenGallery: (item: WorkItem) => void;
  priorityImage?: boolean;
};

export const workGutterClassName = "pl-10 pr-5 md:pl-24 md:pr-10 lg:px-20";

const primaryActionClassName =
  "inline-flex h-10 cursor-pointer items-center gap-2 rounded-full bg-accent px-4.5 text-sm font-medium text-black transition-[background-color,scale] duration-150 hover:bg-accent-soft active:scale-[0.97] motion-reduce:active:scale-100";

const secondaryActionClassName =
  "inline-flex h-10 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-medium text-muted transition-[background-color,color,scale] duration-150 hover:bg-raised hover:text-fg active:scale-[0.97] motion-reduce:active:scale-100";

const getTextVariants = (reduceMotion: boolean): Variants => ({
  hidden: reduceMotion ? {} : { y: 16 },
  visible: {
    y: 0,
    transition: { duration: 0.7, ease: ease.out },
  },
});

const getMediaVariants = (reduceMotion: boolean): Variants => ({
  hidden: reduceMotion
    ? {}
    : { clipPath: "inset(8% 5% 8% 5% round 20px)", scale: 1.03 },
  visible: {
    clipPath: "inset(0% 0% 0% 0% round 12px)",
    scale: 1,
    transition: { duration: 0.9, ease: ease.out },
  },
});

const ProjectMark = ({ item }: { item: WorkItem }) => (
  <span className="grid size-11 shrink-0 place-items-center" aria-hidden="true">
    {item.logo ? (
      <Image
        src={item.logo}
        alt=""
        width={44}
        height={44}
        className={getWorkLogoClassName(item.logoClassName)}
      />
    ) : (
      <span className="grid size-11 place-items-center rounded-xl border border-line bg-raised text-sm font-semibold text-fg/80">
        {getInitials(item.name)}
      </span>
    )}
  </span>
);

const CopyProjectLinkButton = ({ item }: { item: WorkItem }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/work#${item.id}`,
      );
      setCopied(true);
      showSuccessToast(`Link to ${item.name} copied`);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      showErrorToast("Couldn't copy the link");
    }
  };

  return (
    <button
      type="button"
      onClick={() => void handleCopy()}
      className="grid size-8 cursor-pointer place-items-center rounded-lg text-faint opacity-0 transition-[opacity,color,background-color] duration-150 group-hover/chapter:opacity-100 hover:bg-raised hover:text-fg focus-visible:opacity-100 pointer-coarse:opacity-100"
      aria-label={`Copy link to ${item.name}`}
      title="Copy link"
    >
      {copied ? (
        <FiCheck className="text-accent" size={15} aria-hidden="true" />
      ) : (
        <FiLink size={15} aria-hidden="true" />
      )}
    </button>
  );
};

const ProjectChapter = ({
  item,
  index,
  isScrollContainerReady,
  onOpenGallery,
  priorityImage = false,
}: ProjectChapterProps) => {
  const { scrollContainer } = useWorkScroll();
  const reduceMotion = useReducedMotion() ?? false;
  const headingId = `project-${item.id}-heading`;
  const preview = item.screenshots?.[0];
  const isFlipped = index % 2 === 1;
  const viewport = isScrollContainerReady
    ? ({ root: scrollContainer, once: true, amount: 0.25 } as const)
    : ({ once: true, amount: 0.25 } as const);

  const primaryAction = item.website
    ? "website"
    : item.repository
      ? "repository"
      : "gallery";
  const actionClassName = (action: typeof primaryAction) =>
    action === primaryAction
      ? primaryActionClassName
      : secondaryActionClassName;
  const hasActions = Boolean(
    item.website || item.repository || item.screenshots,
  );

  return (
    <article
      id={`work-project-${item.id}`}
      data-work-project={item.id}
      aria-labelledby={headingId}
      className={`group/chapter mx-auto flex min-h-[calc(var(--app-viewport-height)-9rem)] w-full max-w-6xl items-center py-20 ${workGutterClassName}`}
    >
      <div
        className={`grid w-full items-center gap-10 ${
          preview
            ? "md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-14 lg:gap-20"
            : ""
        }`}
      >
        <motion.div
          variants={getTextVariants(reduceMotion)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className={`${isFlipped && preview ? "md:order-2" : ""} ${
            preview ? "" : "max-w-2xl"
          }`}
        >
          <div className="mb-5 flex items-center gap-4">
            <ProjectMark item={item} />
            <div className="flex min-w-0 items-center gap-1">
              <h2
                id={headingId}
                className={`text-3xl font-semibold tracking-[-0.025em] md:text-4xl ${item.accent}`}
              >
                {item.name}
              </h2>
              <CopyProjectLinkButton item={item} />
            </div>
          </div>

          <p className="max-w-xl text-base leading-7 text-muted md:text-[17px] md:leading-8">
            {item.description}
          </p>

          <ul
            className="mt-6 flex flex-wrap gap-x-5 gap-y-2.5"
            aria-label={`${item.name} technologies`}
          >
            {item.technologies.map((technology) => (
              <li
                key={technology.name}
                className="flex items-center gap-2 text-sm text-muted"
              >
                <Image
                  src={technology.icon}
                  alt=""
                  width={16}
                  height={16}
                  className="size-4 object-contain"
                />
                {technology.name}
              </li>
            ))}
          </ul>

          {hasActions && (
            <div className="mt-8 flex flex-wrap items-center gap-1.5">
              {item.website && (
                <a
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={actionClassName("website")}
                >
                  Visit project
                  <FiArrowUpRight size={15} aria-hidden="true" />
                </a>
              )}
              {item.repository && (
                <a
                  href={item.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={actionClassName("repository")}
                >
                  <FaGithub size={15} aria-hidden="true" />
                  Source
                </a>
              )}
              {item.screenshots && (
                <button
                  type="button"
                  onClick={() => onOpenGallery(item)}
                  className={actionClassName("gallery")}
                >
                  <FiImage size={15} aria-hidden="true" />
                  Gallery
                </button>
              )}
            </div>
          )}
        </motion.div>

        {preview && (
          <motion.div
            variants={getMediaVariants(reduceMotion)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className={isFlipped ? "md:order-1" : undefined}
          >
            <button
              type="button"
              onClick={() => onOpenGallery(item)}
              aria-label={`Open ${item.name} screenshot gallery`}
              className="group/preview relative block aspect-video w-full cursor-zoom-in overflow-hidden rounded-xl border border-line bg-raised shadow-[0_40px_80px_-40px_rgb(0_0_0/0.9)]"
            >
              <Image
                src={preview}
                alt={`${item.name} project preview`}
                fill
                priority={priorityImage}
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover transition-transform duration-700 ease-out-expo group-hover/preview:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover/preview:scale-100"
              />
              <span
                className="absolute bottom-3 right-3 grid size-9 place-items-center rounded-full border border-line bg-surface/90 text-fg opacity-0 transition-opacity duration-200 group-hover/preview:opacity-100 group-focus-visible/preview:opacity-100"
                aria-hidden="true"
              >
                <FiMaximize2 size={14} />
              </span>
            </button>
          </motion.div>
        )}
      </div>
    </article>
  );
};

export default ProjectChapter;
