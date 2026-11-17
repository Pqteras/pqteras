"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { FiBriefcase, FiHome, FiMail } from "react-icons/fi";
import { spring } from "../../motion/tokens";

const tabs = [
  { href: "/", label: "Home", icon: FiHome },
  { href: "/work", label: "Work", icon: FiBriefcase },
  { href: "/contact", label: "Contact", icon: FiMail },
] as const;

type TabBounds = Record<string, { x: number; width: number }>;

type TabsProps = {
  activeHref?: string;
  onNavigate?: (href: string, event: MouseEvent<HTMLAnchorElement>) => void;
};

const Tabs = ({ activeHref, onNavigate }: TabsProps) => {
  const pathname = usePathname();
  const currentHref = activeHref ?? pathname;
  const reduceMotion = useReducedMotion() ?? false;
  const navRef = useRef<HTMLElement>(null);
  const [bounds, setBounds] = useState<TabBounds>({});

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const measure = () => {
      const next: TabBounds = {};
      nav.querySelectorAll<HTMLAnchorElement>("a[data-tab]").forEach((link) => {
        next[link.dataset.tab ?? ""] = {
          x: link.offsetLeft,
          width: link.offsetWidth,
        };
      });
      setBounds(next);
    };

    const frame = window.requestAnimationFrame(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(nav);
    void document.fonts?.ready.then(measure);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const pill = bounds[currentHref];

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      className="relative flex select-none items-center gap-1 rounded-full border border-line bg-surface/95 p-1.5 shadow-[0_16px_40px_-16px_rgb(0_0_0/0.8)]"
    >
      {pill && (
        <motion.span
          aria-hidden="true"
          className="absolute left-0 top-1.5 h-9 rounded-full bg-accent"
          initial={false}
          animate={{ x: pill.x, width: pill.width }}
          transition={reduceMotion ? { duration: 0 } : spring.snappy}
        />
      )}

      {tabs.map((tab) => {
        const isActive = currentHref === tab.href;
        const Icon = tab.icon;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            data-tab={tab.href}
            scroll={false}
            onClick={(event) => onNavigate?.(tab.href, event)}
            aria-current={isActive ? "page" : undefined}
            className={`relative flex h-9 items-center gap-2 rounded-full px-4 text-sm font-medium transition-[color,scale] duration-150 active:scale-[0.96] motion-reduce:active:scale-100 ${
              isActive ? "text-black" : "text-muted hover:text-fg"
            } ${isActive && !pill ? "bg-accent" : ""}`}
          >
            <Icon size={15} aria-hidden="true" />
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Tabs;
