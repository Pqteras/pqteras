"use client";

import { useEffect, useState } from "react";

/**
 * Starts animations after mount (avoids hydration weirdness) and
 * lets everything animate together (no artificial waiting).
 */
export const useIntroGate = (isClient: boolean) => {
  const [isIntroReady, setIsIntroReady] = useState(false);

  useEffect(() => {
    if (!isClient) return;
    let raf1 = 0;
    let raf2: number | null = null;

    raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => {
        setIsIntroReady(true);
      });
    });

    return () => {
      window.cancelAnimationFrame(raf1);
      if (raf2) window.cancelAnimationFrame(raf2);
    };
  }, [isClient]);

  return isIntroReady;
};

