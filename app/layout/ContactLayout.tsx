"use client";

import { motion, type Variants } from "motion/react";
import CopyEmailButton from "../components/CopyEmailButton/CopyEmailButton";
import ContactForm from "../contact/ContactForm";

const easeOut = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

/**
 * Contact page layout with intro, email copy, and form.
 */
const ContactLayout = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6"
    >
      <div>
        <motion.p
          variants={itemVariants}
          className="mb-2 text-xs font-medium uppercase tracking-[0.24em] text-yellow-300/70"
        >
          Get in touch
        </motion.p>
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-semibold tracking-tight text-white md:text-3xl"
        >
          Have a project in mind?
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="mt-2 text-sm leading-relaxed text-white/60"
        >
          Fill out the form below, or reach me directly at{" "}
          <CopyEmailButton variant="inline" />.
        </motion.p>
      </div>

      <ContactForm motionVariants={itemVariants} />
    </motion.div>
  );
};

export default ContactLayout;
