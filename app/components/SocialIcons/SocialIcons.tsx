"use client";

import { motion } from "motion/react";
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

const SocialIcons = () => {
  return (
    <div className="flex items-center gap-1">
      {socials.map((social, index) => (
        <motion.a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ y: -2 }}
          whileTap={{ y: -2 }}
          className="p-2 rounded-lg bg-[#151515] border border-white/10 text-white/60 hover:text-yellow-300 hover:border-yellow-400/30 hover:bg-yellow-400/5 transition-colors duration-300"
          aria-label={social.label}
        >
          <social.icon size={16} />
        </motion.a>
      ))}
    </div>
  );
};

export default SocialIcons;
