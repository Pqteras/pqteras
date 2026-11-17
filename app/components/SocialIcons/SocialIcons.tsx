import { FaDiscord, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import CopyEmailButton from "../CopyEmailButton/CopyEmailButton";

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

const SocialIcons = ({ className = "flex" }: { className?: string }) => (
  <div className={`items-center gap-0.5 ${className}`}>
    <CopyEmailButton variant="icon" />
    {socials.map((social) => (
      <a
        key={social.label}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        className="grid size-9 place-items-center rounded-lg text-muted transition-colors duration-150 hover:bg-raised hover:text-fg"
        aria-label={social.label}
        title={social.label}
      >
        <social.icon size={16} aria-hidden="true" />
      </a>
    ))}
  </div>
);

export default SocialIcons;
