export type Technology = {
  name: string;
  icon: string;
};

export const WORK_ITEM_ORDER = [
  "forfeitgg",
  "tichu",
  "docrivo",
  "my-brew",
  "lamiuth",
  "lawnetwork",
  "volume-booster",
  "whatsapp-sound-monitor",
  "discordstamps",
  "superenchants",
] as const;

export type WorkItemId = (typeof WORK_ITEM_ORDER)[number];

type WorkItemBase = {
  id: WorkItemId;
  name: string;
  description: string;
  accent: string;
  technologies: Technology[];
  logo?: string;
  logoClassName?: string;
  website?: string;
  repository?: string;
};

export type WorkItemSource = WorkItemBase & {
  screenshotFolder?: string;
};

export type WorkItem = WorkItemBase & {
  screenshots?: string[];
};

export const WORK_LOGO_BASE_CLASS = "h-full w-full object-contain";

export const getWorkLogoClassName = (logoClassName?: string) =>
  logoClassName
    ? `${WORK_LOGO_BASE_CLASS} ${logoClassName}`
    : WORK_LOGO_BASE_CLASS;

export const getInitials = (name: string) =>
  name
    .split(/\s|\./)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const technology = {
  javascript: {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  },
  typescript: {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  },
  java: {
    name: "Java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  },
  react: {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  },
  bun: {
    name: "Bun",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bun/bun-original.svg",
  },
  sqlcipher: {
    name: "SQLCipher",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg",
  },
  mongodb: {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  },
  discord: {
    name: "Discord.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/discordjs/discordjs-original.svg",
  },
  tailwind: {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  },
  sass: {
    name: "Sass",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg",
  },
  vite: {
    name: "Vite",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
  },
  next: {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  },
  electron: {
    name: "Electron",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/electron/electron-original.svg",
  },
  python: {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  },
} satisfies Record<string, Technology>;

const workItemsById = {
  tichu: {
    id: "tichu",
    name: "Tichu",
    description:
      "Online Tichu for four players. Friends join a room, pass cards, call Tichu, and play a full match on a live table, with accounts, match history, and guest play.",
    accent: "text-rose-300",
    logo: "/project-logos/tichu-logo.svg",
    website: "https://tichu.pasvantiss.com",
    screenshotFolder: "/projects/tichu",
    technologies: [
      technology.next,
      technology.typescript,
      technology.tailwind,
    ],
  },
  docrivo: {
    id: "docrivo",
    name: "Docrivo",
    description:
      "Docrivo is a desktop application built for medical offices to handle patient management end to end. Staff can search and filter records, log visits, update medical history, and manage services from a single interface. It also includes analytics for tracking activity across the practice. Patient data is stored locally in an encrypted SQLCipher database, keeping sensitive information secure on-site.",
    accent: "text-indigo-400",
    logo: "/project-logos/docrivo-logo.png",
    technologies: [
      technology.electron,
      technology.typescript,
      technology.sqlcipher,
      technology.tailwind,
    ],
    screenshotFolder: "/projects/docrivo",
  },
  lamiuth: {
    id: "lamiuth",
    name: "LamiUTH",
    description:
      "A project for the University of Thessaly, Department of Informatics & Telecommunications, designed to provide students with course information, real-time bus tracking, and a custom Discord Bot for essential services, all seamlessly integrated through a robust API that powers both the website and bot functionalities.",
    accent: "text-red-400",
    logo: "/project-logos/lamiuth-logo.png",
    website: "https://www.lamiuth.com/",
    screenshotFolder: "/projects/lamiuth",
    technologies: [
      technology.next,
      technology.typescript,
      technology.mongodb,
      technology.discord,
    ],
  },
  lawnetwork: {
    id: "lawnetwork",
    name: "LawNetwork",
    description: "Official website for the LawNetwork organization.",
    accent: "text-white",
    logo: "/project-logos/lawnetwork-logo.png",
    logoClassName: "invert",
    website: "https://lawnetwork.eu",
    screenshotFolder: "/projects/lawnetwork",
    technologies: [
      technology.vite,
      technology.typescript,
      technology.tailwind,
    ],
  },
  forfeitgg: {
    id: "forfeitgg",
    name: "FORFEIT.GG",
    description:
      "IT'S BACK! League of Legends stats, the modern way. Ranked history, live game scouting, regional ladders and patch-fresh builds, with every match graded by our own FF Score. Rebuilt and back online, with no plans to forfeit this time.",
    accent: "text-[#E2D4B0]",
    logo: "/project-logos/forfeitgg-logo.svg",
    website:
      "https://forfeit.gg",
    technologies: [
      technology.next,
      technology.typescript,
      technology.mongodb,
      technology.tailwind,
    ],
    screenshotFolder: "/projects/forfeitgg",
  },
  "my-brew": {
    id: "my-brew",
    name: "My Brew",
    description:
      "Showcase-only digital menu experience for a coffee bar, built for in-store QR scans. Guests land on a branded hero, then browse the full menu with smooth motion and bilingual support. This is a design and engineering portfolio piece, not the coffee bar's official website.",
    accent:
      "rounded-lg bg-[#1e5957] px-2.5 pb-1 pt-0.5 text-[#f1f7f6] box-decoration-clone",
    logo: "/project-logos/my-brew-logo.jpg",
    logoClassName: "rounded-sm",
    screenshotFolder: "/projects/mybrew",
    website: "https://mbre.cc",
    technologies: [
      technology.next,
      technology.typescript,
      technology.tailwind,
    ],
  },
  "volume-booster": {
    id: "volume-booster",
    name: "Volume Booster",
    description:
      "Chrome extension for when 100% isn't loud enough. Boosts the current tab up to 670%. Each tab keeps its own level until you close it.",
    accent: "text-lime-300",
    logo: "/project-logos/volume-booster-logo.svg",
    screenshotFolder: "/projects/volume-booster",
    repository: "https://github.com/Pqteras/volume-booster-extension",
    technologies: [technology.typescript, technology.tailwind],
  },
  "whatsapp-sound-monitor": {
    id: "whatsapp-sound-monitor",
    name: "WhatsApp Sound Monitor",
    description:
      "Independent Windows utility that restores audible WhatsApp Desktop alerts when OS notifications are muted. It watches unread badge counts through UI Automation, runs from the system tray, and plays a local custom sound with zero network access.",
    accent: "text-emerald-400",
    repository: "https://github.com/Pqteras/whatsapp-sound-monitor",
    technologies: [technology.python],
  },
  discordstamps: {
    id: "discordstamps",
    name: "DiscordStamps",
    description: "A basic and useful Discord timestamp generator.",
    accent: "text-blue-400",
    logo: "/project-logos/discordstamps-logo.svg",
    website: "https://discordstamps.vercel.app/",
    repository: "https://github.com/Pqteras/discord-timestamps",
    technologies: [
      technology.vite,
      technology.javascript,
      technology.tailwind,
      technology.sass,
    ],
  },
  superenchants: {
    id: "superenchants",
    name: "SuperEnchants",
    description:
      "Minecraft Mod that adds the ability to make a super enchantment out of the already existing ones.",
    accent: "text-amber-400",
    repository: "https://github.com/Pqteras/superenchants",
    technologies: [technology.java],
  },
} satisfies Record<WorkItemId, WorkItemSource>;

export const workItemSources: WorkItemSource[] = WORK_ITEM_ORDER.map(
  (id) => workItemsById[id],
);
