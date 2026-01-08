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
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-light border border-white/10"
    >
      <span className="relative grid h-2.5 w-2.5 place-items-center">
        {isOnline && (
          <motion.span
            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="col-start-1 row-start-1 h-full w-full rounded-full bg-green-400"
          />
        )}
        <span
          className={`col-start-1 row-start-1 h-2.5 w-2.5 rounded-full ${
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
