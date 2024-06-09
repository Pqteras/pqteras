import { motion } from "framer-motion";
import { contentVariants } from "../utils/animations";

function Section({ title, text, index }) {
  return (
    <motion.section
      className="flex self-start w-full flex-col items-start mt-5"
      variants={contentVariants}
      initial="hidden"
      animate="visible"
      custom={index}
    >
      <div className="flex items-center w-full">
        <h2 className="mr-3 text-2xl text-yellow-300 font-semibold">{title}</h2>
        <div className="flex-grow h-[4px] rounded-full bg-black/20 dark:bg-white/20" />
      </div>
      <p className="mt-[10px]">{text}</p>
    </motion.section>
  );
}

export default Section;
