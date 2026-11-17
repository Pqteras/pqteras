"use client";

import { useRef, useState, type RefObject } from "react";

type UseHydratedRefResult<T extends HTMLElement> = {
  ref: RefObject<T | null>;
  setRef: (node: T | null) => void;
  isHydrated: boolean;
};

// Motion's useScroll throws if it gets a ref before hydration.
export const useHydratedRef = <T extends HTMLElement>(): UseHydratedRefResult<T> => {
  const ref = useRef<T | null>(null);
  const hasHydratedRef = useRef(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const setRef = (node: T | null) => {
    ref.current = node;

    if (node && !hasHydratedRef.current) {
      hasHydratedRef.current = true;
      setIsHydrated(true);
    }
  };

  return { ref, setRef, isHydrated };
};
