export type Technology = {
  name: string;
  icon: string;
};

export const WORK_ITEM_ORDER = [
  "docrivo",
  "lamiuth",
  "forfeitgg",
  "volume-booster",
  "lawnetwork",
  "discordstamps",
  "superenchants",
] as const;

export type WorkItemId = (typeof WORK_ITEM_ORDER)[number];

export type WorkItem = {
  id: WorkItemId;
  name: string;
  description: string;
  accent: string;
  technologies: Technology[];
  logo?: string;
  invertLogo?: boolean;
  website?: string;
  repository?: string;
  screenshots?: string[];
};

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
  node: {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
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
} satisfies Record<string, Technology>;

const workItemsById = {
  docrivo: {
    id: "docrivo",
    name: "Docrivo",
    description:
      "An advanced application designed to streamline the process of patient management in a doctor's office. With its powerful search functionality, it allows healthcare professionals to easily find patient records based on various criteria. Additionally, Docrivo enables doctors to keep track of patients' visits, making it convenient to access and update their medical history. This comprehensive solution aims to enhance efficiency and improve patient care in the medical field.",
    accent: "text-indigo-400",
    logo: "/project-logos/docrivo-logo.png",
    technologies: [
      technology.electron,
      technology.tailwind,
      technology.typescript,
      technology.vite,
      technology.mongodb,
    ],
    screenshots: [
      "/projects/docrivo/docrivo_main.png",
      "/projects/docrivo/docrivo_staff.png",
      "/projects/docrivo/docrivo_services.png",
      "/projects/docrivo/docrivo_analytics.png",
      "/projects/docrivo/docrivo_analytics_2.png",
    ],
  },
  lamiuth: {
    id: "lamiuth",
    name: "LamiUTH",
    description:
      "A project for the University of Thessaly, Department of Informatics & Telecommunications, designed to provide students with course information, real-time bus tracking, and a custom Discord Bot for essential services, all seamlessly integrated through a robust API that powers both the website and bot functionalities.",
    accent: "text-red-400",
    logo: "/project-logos/lamiuth-logo.png",
    website: "https://www.lamiuth.com/",
    screenshots: ["/projects/lamiuth/lamiuth-showcase.jpg"],
    technologies: [
      technology.react,
      technology.node,
      technology.mongodb,
      technology.discord,
      technology.typescript,
    ],
  },
  lawnetwork: {
    id: "lawnetwork",
    name: "LawNetwork",
    description: "Official website for the LawNetwork organization.",
    accent: "text-orange-400",
    logo: "/project-logos/lawnetwork-logo.png",
    invertLogo: true,
    website: "https://www.lawnetwork.eu",
    technologies: [
      technology.react,
      technology.javascript,
      technology.tailwind,
      technology.sass,
      technology.vite,
    ],
  },
  forfeitgg: {
    id: "forfeitgg",
    name: "ForFeit.GG",
    description:
      "League of Legends statistics platform delivering deep match history analytics, champion meta insights, and player progression tracking. Features include leaderboard/ranked ladder tracking, LP progression charts over time, role and champion performance breakdowns, tier lists per patch, and build/rune recommendations based on real data. (Project discontinued due to financial issues.)",
    accent: "text-yellow-300",
    logo: "/project-logos/forfeitgg-logo.png",
    website:
      "https://discord.com/channels/1339953444588490844/1339960283057356911/1456659654489931827",
    technologies: [
      technology.next,
      technology.typescript,
      technology.tailwind,
      technology.mongodb,
    ],
    screenshots: [
      "/projects/forfeitgg/forfeitgg_showcase_1.png",
      "/projects/forfeitgg/forfeitgg_showcase_2.png",
      "/projects/forfeitgg/forfeitgg_showcase_3.png",
      "/projects/forfeitgg/forfeitgg_showcase_4.png",
      "/projects/forfeitgg/forfeitgg_showcase_5.png",
    ],
  },
  "volume-booster": {
    id: "volume-booster",
    name: "Volume Booster",
    description:
      "Chrome extension for when 100% isn't loud enough. Boosts the current tab up to 670%. Each tab keeps its own level until you close it.",
    accent: "text-lime-300",
    logo: "/project-logos/volume-booster-logo.svg",
    screenshots: ["/projects/volume-booster/volume-booster-showcase.webp"],
    repository: "https://github.com/Pqteras/volume-booster-extension",
    technologies: [technology.typescript],
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
      technology.react,
      technology.javascript,
      technology.tailwind,
      technology.sass,
      technology.vite,
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
} satisfies Record<WorkItemId, WorkItem>;

export const workItems: WorkItem[] = WORK_ITEM_ORDER.map(
  (id) => workItemsById[id],
);
