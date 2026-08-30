"use client";

import { useEffect } from "react";

const VIEWPORT_PROPERTY = "--app-viewport-height";
const SCROLL_LOCK_CLASS = "app-scroll-locked";

export const useAppViewport = (lockDocumentScroll: boolean) => {
  useEffect(() => {
    const viewport = window.visualViewport;
    let animationFrame = 0;

    const syncViewportHeight = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        const height = viewport?.height ?? window.innerHeight;
        document.documentElement.style.setProperty(
          VIEWPORT_PROPERTY,
          `${Math.round(height)}px`,
        );
      });
    };

    syncViewportHeight();
    window.addEventListener("resize", syncViewportHeight, { passive: true });
    window.addEventListener("pageshow", syncViewportHeight);
    viewport?.addEventListener("resize", syncViewportHeight, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", syncViewportHeight);
      window.removeEventListener("pageshow", syncViewportHeight);
      viewport?.removeEventListener("resize", syncViewportHeight);
    };
  }, []);

  useEffect(() => {
    if (!lockDocumentScroll) return;

    const root = document.documentElement;
    const body = document.body;
    root.classList.add(SCROLL_LOCK_CLASS);
    body.classList.add(SCROLL_LOCK_CLASS);

    return () => {
      root.classList.remove(SCROLL_LOCK_CLASS);
      body.classList.remove(SCROLL_LOCK_CLASS);
    };
  }, [lockDocumentScroll]);
};
