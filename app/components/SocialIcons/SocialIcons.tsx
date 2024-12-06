"use client";
import { FaLinkedin, FaGithub, FaInstagram, FaDiscord } from "react-icons/fa";

const SocialIcons = () => {
  return (
    <div className="flex space-x-4">
      <a
        href="https://github.com/Pqteras"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-yellow-300 transition-colors duration-200"
      >
        <FaGithub size="24" />
      </a>
      <a
        href="https://www.instagram.com/pasvantiss"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-yellow-300 transition-colors duration-200"
      >
        <FaInstagram size="24" />
      </a>
      <a
        href="https://www.linkedin.com/in/theocharis-pasvantis-311525166/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-yellow-300 transition-colors duration-200"
      >
        <FaLinkedin size="24" />
      </a>
      <a
        href="https://discordapp.com/users/303804858744700929/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-yellow-300 transition-colors duration-200"
      >
        <FaDiscord size="24" />
      </a>
    </div>
  );
};

export default SocialIcons;
