"use client";

import { motion, type Variants } from "motion/react";
import { FaLinkedin, FaGithub, FaInstagram, FaDiscord } from "react-icons/fa";

const socials = [
  { icon: FaGithub, href: "https://github.com/Pqteras", label: "GitHub" },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/pasvantiss",
    label: "Instagram",
  },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/theocharis-pasvantis-311525166/",
    label: "LinkedIn",
  },
  {
    icon: FaDiscord,
    href: "https://discordapp.com/users/303804858744700929/",
    label: "Discord",
  },
];

type SocialIconsProps = {
  isIntroReady?: boolean;
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const iconVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const SocialIcons = ({ isIntroReady = true }: SocialIconsProps) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isIntroReady ? "visible" : "hidden"}
      className="flex items-center gap-1"
    >
      {socials.map((social) => (
        <motion.a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          variants={iconVariants}
          whileHover={{ y: -2 }}
          whileTap={{ y: -2 }}
          className="p-2 rounded-lg bg-surface-light border border-white/10 text-white/60 hover:text-yellow-300 hover:border-yellow-400/30 hover:bg-yellow-400/5 transition-colors duration-300"
          aria-label={social.label}
        >
          <social.icon size={16} />
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialIcons;
