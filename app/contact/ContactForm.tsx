"use client";

import { motion, type Variants } from "motion/react";
import {
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";
import { submitContactForm, type ContactFormState } from "./actions";
import { showErrorToast, showSuccessToast } from "../utils/toast";

const initialState: ContactFormState = { status: "idle" };

const fieldClassName =
  "w-full rounded-lg border border-white/10 bg-surface px-3 py-2.5 text-sm text-white placeholder:text-white/30 transition-colors duration-300 focus:border-yellow-400/30 focus:outline-none";

type ContactFormProps = {
  motionVariants?: Variants;
};

/**
 * Contact form wired to the submitContactForm Server Action.
 */
const ContactForm = ({ motionVariants }: ContactFormProps) => {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  );
  const [startedAt] = useState(() => Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status !== "success") return;
    formRef.current?.reset();
  }, [state.status]);

  useEffect(() => {
    if (state.status === "idle" || !state.message) return;

    if (state.status === "success") {
      showSuccessToast(state.message);
      return;
    }

    showErrorToast(state.message);
  }, [state]);

  return (
    <motion.form
      ref={formRef}
      action={formAction}
      variants={motionVariants}
      className="flex flex-col gap-3"
    >
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 overflow-hidden"
      >
        <input tabIndex={-1} autoComplete="off" name="website" />
      </div>
      <input type="hidden" name="_startedAt" value={startedAt} />

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-yellow-300/80">Name</span>
          <input
            type="text"
            name="name"
            required
            maxLength={80}
            autoComplete="name"
            placeholder="Your name"
            className={fieldClassName}
            disabled={isPending}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-yellow-300/80">Email</span>
          <input
            type="email"
            name="email"
            required
            maxLength={254}
            autoComplete="email"
            placeholder="you@example.com"
            className={fieldClassName}
            disabled={isPending}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-yellow-300/80">Subject</span>
        <input
          type="text"
          name="subject"
          required
          maxLength={120}
          placeholder="What's this about?"
          className={fieldClassName}
          disabled={isPending}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-yellow-300/80">Message</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          placeholder="Tell me about your project or question..."
          className={`${fieldClassName} resize-none`}
          disabled={isPending}
        />
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="flex items-center justify-center gap-2 rounded-lg border border-yellow-400/20 bg-yellow-400/10 px-4 py-2.5 text-sm font-medium text-yellow-300 transition-all duration-300 hover:border-yellow-400/40 hover:bg-yellow-400/15 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? (
          <>
            <FaSpinner className="animate-spin" size={14} />
            Sending...
          </>
        ) : (
          <>
            <FaPaperPlane size={14} />
            Send message
          </>
        )}
      </button>
    </motion.form>
  );
};

export default ContactForm;
