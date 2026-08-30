"use client";

import { motion, type Variants } from "motion/react";
import { useCallback, useState, type KeyboardEvent } from "react";
import { FaCheck, FaCopy, FaEnvelope } from "react-icons/fa";
import { CONTACT_EMAIL } from "../../utils/siteMetadata";
import { showSuccessToast } from "../../utils/toast";

type CopyEmailButtonProps = {
  variant?: "icon" | "inline";
  motionVariants?: Variants;
};

const COPY_FEEDBACK_MS = 2000;

/**
 * Copies the portfolio contact email to the clipboard with accessible feedback.
 */
const CopyEmailButton = ({
  variant = "icon",
  motionVariants,
}: CopyEmailButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      showSuccessToast("Email copied to clipboard");
      window.setTimeout(() => setCopied(false), COPY_FEEDBACK_MS);
    } catch {
      setCopied(false);
    }
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      void handleCopy();
    },
    [handleCopy],
  );

  if (variant === "inline") {
    return (
      <motion.button
        type="button"
        variants={motionVariants}
        onClick={() => void handleCopy()}
        onKeyDown={handleKeyDown}
        className="group inline-flex items-center gap-1.5 border-b border-dashed border-white/20 align-baseline text-white/80 transition-colors duration-300 hover:border-yellow-300/50 hover:text-yellow-300"
        aria-label="Copy email address"
      >
        {CONTACT_EMAIL}
        {copied ? (
          <FaCheck className="text-yellow-300" size={11} />
        ) : (
          <FaCopy
            className="text-white/40 transition-colors group-hover:text-yellow-300"
            size={11}
          />
        )}
        <span className="sr-only" aria-live="polite">
          {copied ? "Copied to clipboard" : ""}
        </span>
      </motion.button>
    );
  }

  return (
    <motion.button
      type="button"
      variants={motionVariants}
      whileHover={{ y: -2 }}
      whileTap={{ y: -2 }}
      onClick={() => void handleCopy()}
      onKeyDown={handleKeyDown}
      className="rounded-lg border border-white/10 bg-surface-light p-2 text-white/60 transition-colors duration-300 hover:border-yellow-400/30 hover:bg-yellow-400/5 hover:text-yellow-300"
      aria-label="Copy email address"
    >
      {copied ? <FaCheck size={16} /> : <FaEnvelope size={16} />}
      <span className="sr-only" aria-live="polite">
        {copied ? "Email copied" : CONTACT_EMAIL}
      </span>
    </motion.button>
  );
};

export default CopyEmailButton;
