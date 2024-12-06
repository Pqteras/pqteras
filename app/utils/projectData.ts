// Purpose: Store project data to be used in the Projects component.

interface Project {
  url?: string;
  github_url?: string;
  name: string;
  description?: string;
  techStack: string[];
}

const techStack = {
  JavaScript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  TypeScript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  Java: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  React:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  Node: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  MongoDB:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  DiscordJS:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/discordjs/discordjs-original.svg",
  TailwindCSS:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  SCSS: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg",
  Vite: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
  NextJS:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  ElectronJS:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/electron/electron-original.svg",
};

export const projects: Project[] = [
  {
    url: `https://www.lawnetwork.eu`,
    name: `LawNetwork`,
    description: `Official Website for the LawNetwork organization.`,
    techStack: [
      techStack.React,
      techStack.JavaScript,
      techStack.TailwindCSS,
      techStack.SCSS,
      techStack.Vite,
    ],
  },
  {
    url: `https://www.lamiuth.com/`,
    name: `LamiUTH`,
    description: `A project for the University of Thessaly, Department of Informatics & Telecommunications, designed to provide students with course information, real-time bus tracking, and a custom Discord Bot for essential services, all seamlessly integrated through a robust API that powers both the website and bot functionalities.`,
    techStack: [
      techStack.React,
      techStack.Node,
      techStack.MongoDB,
      techStack.DiscordJS,
      techStack.TypeScript,
    ],
  },
  {
    url: `https://discordstamps.vercel.app/`,
    github_url: `https://github.com/Pqteras/discord-timestamps`,
    name: `DiscordStamps`,
    description: `A basic and useful discord timestamp generator`,
    techStack: [
      techStack.React,
      techStack.JavaScript,
      techStack.TailwindCSS,
      techStack.SCSS,
      techStack.Vite,
    ],
  },
  {
    github_url: `https://github.com/Pqteras/superenchants`,
    name: `SuperEnchants`,
    description: `Minecraft Mod that adds the ability to make a super enchantment out of the already existing ones.`,
    techStack: [techStack.Java],
  },
];
