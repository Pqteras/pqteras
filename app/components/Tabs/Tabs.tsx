"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import TabIcon from "./TabIcon";

const tabs = [
  { href: "/", label: "Home", variant: "home" as const },
  { href: "/work", label: "Work", variant: "work" as const },
  { href: "/contact", label: "Contact", variant: "contact" as const },
];

const tapSpring = {
  type: "spring" as const,
  stiffness: 520,
  damping: 34,
  mass: 0.55,
};

type TabsProps = {
  activeHref?: string;
  onNavigate?: (href: string, event: MouseEvent<HTMLAnchorElement>) => void;
};

const Tabs = ({ activeHref, onNavigate }: TabsProps) => {
  const pathname = usePathname();
  const currentHref = activeHref ?? pathname;
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="select-none flex items-center gap-1 p-1.5 rounded-full bg-surface border border-white/10 shadow-lg shadow-black/20"
    >
      {tabs.map((tab) => {
        const isActive = currentHref === tab.href;

        return (
          <motion.div
            key={tab.href}
            whileTap={reduceMotion ? undefined : { scale: 0.92 }}
            transition={tapSpring}
            className="relative"
          >
            <Link
              href={tab.href}
              scroll={false}
              onClick={(event) => onNavigate?.(tab.href, event)}
              className={`group relative flex items-center gap-1.5 px-4 py-2 rounded-full font-medium text-sm transition-colors duration-300 ${
                isActive ? "text-black" : "text-white/60 hover:text-white/80"
              }`}
              aria-label={`Navigate to ${tab.label}`}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && (
                <motion.span
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full bg-yellow-300"
                  transition={{ type: "spring", stiffness: 480, damping: 32 }}
                />
              )}
              <TabIcon variant={tab.variant} isActive={isActive} />
              <span className="relative z-10">{tab.label}</span>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default Tabs;
