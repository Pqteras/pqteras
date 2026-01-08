"use client";

import { motion } from "motion/react";

interface LinksProps {
  href: string;
  text: string;
}

const Links = ({ href, text }: LinksProps) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      className="relative inline-block text-yellow-300 font-medium hover:text-yellow-400 transition-colors duration-200 underline underline-offset-2 decoration-yellow-300/50 hover:decoration-yellow-400"
    >
      {text}
    </motion.a>
  );
};

export default Links;
