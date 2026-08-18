"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { FaHome } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";

const tabs = [
  { href: "/", label: "Home", icon: FaHome },
  { href: "/work", label: "Work", icon: IoSparkles },
];

type TabsProps = {
  activeHref?: string;
  onNavigate?: (href: string, event: MouseEvent<HTMLAnchorElement>) => void;
};

const Tabs = ({ activeHref, onNavigate }: TabsProps) => {
  const pathname = usePathname();
  const currentHref = activeHref ?? pathname;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-1 p-1.5 rounded-full bg-surface border border-white/10 shadow-lg shadow-black/20"
    >
      {tabs.map((tab) => {
        const isActive = currentHref === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            scroll={false}
            onClick={(event) => onNavigate?.(tab.href, event)}
            className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full font-medium text-sm transition-colors duration-300 ${
              isActive ? "text-black" : "text-white/60 hover:text-white/80"
            }`}
            aria-label={`Navigate to ${tab.label}`}
            aria-current={isActive ? "page" : undefined}
          >
            {isActive && (
              <motion.span
                layoutId="activeTab"
                className="absolute inset-0 rounded-full bg-yellow-300"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <tab.icon className="relative z-10 text-base" />
            <span className="relative z-10">{tab.label}</span>
          </Link>
        );
      })}
    </motion.div>
  );
};

export default Tabs;
