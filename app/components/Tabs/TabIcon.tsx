"use client";

import { FaEnvelope, FaEnvelopeOpen, FaHome } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";

type TabIconProps = {
  variant: "home" | "work" | "contact";
  isActive: boolean;
};

/**
 * Tab icons animated via the parent Link `.group` hover/active (full tab hit area).
 */
const TabIcon = ({ variant, isActive }: TabIconProps) => {
  if (variant === "contact") {
    return (
      <span className="tab-nav-icon tab-nav-icon--contact relative z-10 inline-flex h-4 w-4 items-center justify-center">
        <FaEnvelope
          size={16}
          className="absolute transition-all duration-300 ease-out group-hover:scale-75 group-hover:opacity-0 group-active:scale-90"
          aria-hidden="true"
        />
        <FaEnvelopeOpen
          size={16}
          className={`absolute scale-75 opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 group-active:scale-95 ${
            isActive ? "text-black" : "group-hover:text-yellow-300"
          }`}
          aria-hidden="true"
        />
      </span>
    );
  }

  if (variant === "work") {
    return (
      <span className="tab-nav-icon tab-nav-icon--work relative z-10 inline-flex">
        <IoSparkles
          size={16}
          className={`transition-colors duration-300 ${
            isActive ? "text-black" : "text-inherit group-hover:text-yellow-300"
          }`}
        />
      </span>
    );
  }

  return (
    <span className="tab-nav-icon tab-nav-icon--home relative z-10 inline-flex">
      <FaHome
        size={16}
        className={`transition-colors duration-300 ${
          isActive
            ? "text-black"
            : "text-inherit group-hover:text-yellow-300/90"
        }`}
      />
    </span>
  );
};

export default TabIcon;
