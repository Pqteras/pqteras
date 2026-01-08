// Purpose: Store project data to be used in the Projects component.

interface Project {
  title_color?: string; // With tailwind written classes (Example: indigo-500)
  url?: string;
  github_url?: string;
  name: string;
  description?: string;
  screenshots?: string[];
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
    title_color: "text-orange-700",
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
    title_color: "text-emerald-500",
    name: `DermaPad`,
    description: `Private patient management system built for my mother’s dermatology clinic. It supports appointment scheduling, detailed procedure documentation, and full patient history tracking. The app also generates analytics and statistics on visits and patient trends, including clear yearly charts to help the clinic understand performance over time.`,
    techStack: [techStack.ElectronJS, techStack.TailwindCSS, techStack.TypeScript, techStack.Vite, techStack.MongoDB],
    screenshots: [
      "/projects/dermapad/dermapad_showcase.png",
    ],
  },
  {
    title_color: "text-yellow-500",
    url: 'https://discord.com/channels/1339953444588490844/1339960283057356911/1456659654489931827',
    name: `ForFeit.GG`,
    description: `League of Legends statistics platform delivering deep match history analytics, champion meta insights, and player progression tracking. Features include leaderboard/ranked ladder tracking, LP progression charts over time, role and champion performance breakdowns, tier lists per patch, and build/rune recommendations based on real data. (Project discontinued due to financial issues.)`,
    techStack: [
      techStack.NextJS,
      techStack.TypeScript,
      techStack.TailwindCSS,
      techStack.MongoDB,
    ],
    screenshots: [
      "/projects/forfeitgg/forfeitgg_showcase_1.png",
      "/projects/forfeitgg/forfeitgg_showcase_2.png",
      "/projects/forfeitgg/forfeitgg_showcase_3.png",
      "/projects/forfeitgg/forfeitgg_showcase_4.png",
      "/projects/forfeitgg/forfeitgg_showcase_5.png",
    ],
  },
  {
    title_color: "text-red-500",
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
    title_color: "text-blue-500",
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
    title_color: "text-amber-500",
    github_url: `https://github.com/Pqteras/superenchants`,
    name: `SuperEnchants`,
    description: `Minecraft Mod that adds the ability to make a super enchantment out of the already existing ones.`,
    techStack: [techStack.Java],
  },
];
