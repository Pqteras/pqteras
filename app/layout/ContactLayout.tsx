"use client";

import { motion, useReducedMotion } from "motion/react";
import CopyEmailButton from "../components/CopyEmailButton/CopyEmailButton";
import ContactForm from "../contact/ContactForm";
import { fadeUp, stagger } from "../motion/tokens";

const ContactLayout = () => {
  const reduceMotion = useReducedMotion() ?? false;
  const item = fadeUp(reduceMotion);

  return (
    <motion.div
      variants={stagger(0.07, 0.05)}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-7 pt-2"
    >
      <motion.div variants={item}>
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-fg md:text-[28px]">
          Have a project in mind?
        </h2>
        <p className="mt-2 text-[15px] leading-7 text-muted">
          Fill out the form below, or reach me directly at{" "}
          <CopyEmailButton variant="inline" />.
        </p>
      </motion.div>

      <ContactForm motionVariants={item} />
    </motion.div>
  );
};

export default ContactLayout;
