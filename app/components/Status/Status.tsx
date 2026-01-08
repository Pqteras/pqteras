"use client";

import { useLanyard } from "react-use-lanyard";
import { motion } from "motion/react";

const Status = () => {
  const { status } = useLanyard({
    userId: "303804858744700929",
    socket: true,
  });

  const isOnline = status?.discord_status !== "offline";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#151515] border border-white/10"
    >
      <span className="relative flex h-2.5 w-2.5">
        {isOnline && (
          <motion.span
            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inline-flex h-full w-full rounded-full bg-green-400"
          />
        )}
        <span
          className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
            isOnline ? "bg-green-400" : "bg-gray-500"
          }`}
        />
      </span>
      <span className="text-xs font-medium text-white/80">
        {isOnline ? "Online" : "Offline"}
      </span>
    </motion.div>
  );
};

export default Status;
