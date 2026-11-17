"use client";

import { motion, type Variants } from "motion/react";
import { useActionState, useEffect, useRef, useState } from "react";
import { FiLoader, FiSend } from "react-icons/fi";
import { submitContactForm, type ContactFormState } from "./actions";
import { showErrorToast, showSuccessToast } from "../utils/toast";

const initialState: ContactFormState = { status: "idle" };

const labelClassName = "flex flex-col gap-2";
const labelTextClassName = "text-[13px] font-medium text-fg/80";
const fieldClassName =
  "w-full rounded-lg border border-line bg-raised px-3.5 py-2.5 text-[15px] text-fg placeholder:text-faint transition-[border-color,box-shadow] duration-150 hover:border-line-strong focus:border-accent/60 focus:outline-none focus:ring-3 focus:ring-accent/15 user-invalid:border-red-400/70 disabled:cursor-not-allowed disabled:opacity-60";

type ContactFormProps = {
  motionVariants?: Variants;
};

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
      className="flex flex-col gap-4"
    >
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 overflow-hidden"
      >
        <input tabIndex={-1} autoComplete="off" name="website" />
      </div>
      <input type="hidden" name="_startedAt" value={startedAt} />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClassName}>
          <span className={labelTextClassName}>Name</span>
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
        <label className={labelClassName}>
          <span className={labelTextClassName}>Email</span>
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

      <label className={labelClassName}>
        <span className={labelTextClassName}>Subject</span>
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

      <label className={labelClassName}>
        <span className={labelTextClassName}>Message</span>
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
        className="mt-1 inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-black transition-[background-color,scale] duration-150 hover:bg-accent-soft active:scale-[0.98] disabled:cursor-progress disabled:opacity-70 motion-reduce:active:scale-100 sm:w-auto sm:self-end"
      >
        {isPending ? (
          <>
            <FiLoader
              className="animate-spin motion-reduce:animate-none"
              size={15}
              aria-hidden="true"
            />
            Sending...
          </>
        ) : (
          <>
            <FiSend size={15} aria-hidden="true" />
            Send message
          </>
        )}
      </button>
    </motion.form>
  );
};

export default ContactForm;
