"use client";

import { useState } from "react";
import { FaCheck, FaEnvelope } from "react-icons/fa";
import { FiCheck, FiCopy } from "react-icons/fi";
import { CONTACT_EMAIL } from "../../utils/siteMetadata";
import { showErrorToast, showSuccessToast } from "../../utils/toast";

type CopyEmailButtonProps = {
  variant?: "icon" | "inline";
};

const COPY_FEEDBACK_MS = 2000;

const CopyEmailButton = ({ variant = "icon" }: CopyEmailButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      showSuccessToast("Email copied to clipboard");
      window.setTimeout(() => setCopied(false), COPY_FEEDBACK_MS);
    } catch {
      showErrorToast("Couldn't copy the email");
    }
  };

  if (variant === "inline") {
    return (
      <button
        type="button"
        onClick={() => void handleCopy()}
        className="group inline-flex cursor-pointer items-baseline gap-1.5 rounded-sm text-fg underline decoration-line-strong underline-offset-4 transition-colors duration-150 hover:decoration-accent"
        aria-label={`Copy email address ${CONTACT_EMAIL}`}
      >
        {CONTACT_EMAIL}
        {copied ? (
          <FiCheck
            className="self-center text-accent"
            size={13}
            aria-hidden="true"
          />
        ) : (
          <FiCopy
            className="self-center text-faint transition-colors duration-150 group-hover:text-fg"
            size={13}
            aria-hidden="true"
          />
        )}
        <span className="sr-only" aria-live="polite">
          {copied ? "Copied to clipboard" : ""}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => void handleCopy()}
      className="grid size-9 cursor-pointer place-items-center rounded-lg text-muted transition-colors duration-150 hover:bg-raised hover:text-fg"
      aria-label="Copy email address"
      title="Copy email"
    >
      {copied ? (
        <FaCheck size={15} className="text-accent" aria-hidden="true" />
      ) : (
        <FaEnvelope size={16} aria-hidden="true" />
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? "Email copied" : ""}
      </span>
    </button>
  );
};

export default CopyEmailButton;
