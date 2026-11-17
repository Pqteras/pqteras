"use client";

import { motion, useReducedMotion } from "motion/react";
import { useLanyard } from "react-use-lanyard";
import { ease } from "../../motion/tokens";

const Status = () => {
  const reduceMotion = useReducedMotion() ?? false;
  const { status } = useLanyard({
    userId: "303804858744700929",
    socket: true,
  });

  const isOnline = status?.discord_status !== "offline";

  return (
    <div
      role="status"
      className="flex shrink-0 items-center gap-2 rounded-full border border-line bg-raised/60 px-3 py-1.5"
    >
      <span
        className="relative grid size-2 place-items-center"
        aria-hidden="true"
      >
        {isOnline && !reduceMotion && (
          <motion.span
            animate={{ scale: [1, 2.6], opacity: [0.55, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: ease.out }}
            className="col-start-1 row-start-1 size-full rounded-full bg-online"
          />
        )}
        <span
          className={`col-start-1 row-start-1 size-2 rounded-full transition-colors duration-300 ${
            isOnline ? "bg-online" : "bg-faint"
          }`}
        />
      </span>
      <span className="text-xs font-medium text-fg/85">
        {isOnline ? "Online" : "Offline"}
      </span>
    </div>
  );
};

export default Status;
