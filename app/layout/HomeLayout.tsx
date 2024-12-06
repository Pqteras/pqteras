"use client";
import Links from "@/app/components/Links/Links";
import { getAge } from "@/app/utils/helpers";

export default function HomeLayout() {
  return (
    <>
      <div className="mt-2">
        <h3 className="text-yellow-300 font-bold text-xl md:text-2xl">
          About Me
        </h3>
        <p className="text-sm md:text-base">
          Greetings! My name is Theocharis Pasvantis, a computer science
          enthusiast studying in Lamia, Greece. I&apos;m {getAge()} years old and
          love diving into the exciting world of technology. I&apos;m always eager to
          learn new things, explore cool ideas, and grow my skills along the
          way!
        </p>
      </div>
      <div className="mt-2">
        <h3 className="text-yellow-300 font-bold text-xl md:text-2xl">
          Hobbies
        </h3>
        <p className="text-sm md:text-base">
          Alongside my computer science studies, I&apos;m deeply involved in hobbies
          like table tennis, video gaming, and fitness, which perfectly balance
          my passion for coding. I believe that combining work with personal
          interests creates a well-rounded and enjoyable life.
        </p>
      </div>
      <div className="mt-2">
        <h3 className="text-yellow-300 font-bold text-xl md:text-2xl">
          Knowledge
        </h3>
        <p className="text-sm md:text-base">
          My coding journey started with JavaScript and TypeScript, driven by
          Discord projects using{" "}
          <Links text="discord.js" href="https://discord.js.org/" />. I&apos;ve built
          a strong foundation in HTML and CSS and evolved into a skilled{" "}
          <Links text="React" href="https://reactjs.org/" /> developer. I&apos;m
          proficient in frameworks like{" "}
          <Links text="Vite" href="https://vitejs.dev/" />,{" "}
          <Links text="Next.js" href="https://nextjs.org/" />, and have hands-on
          experience with{" "}
          <Links text="Electron.js" href="https://www.electronjs.org/" />. I&apos;m
          always eager to grow and improve.
        </p>
      </div>
    </>
  );
}
