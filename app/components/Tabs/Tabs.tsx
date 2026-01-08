"use client";

import { motion } from "motion/react";
import { FaHome } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";

interface TabsProps {
  selectedTab: string;
  setSelectedTab: (value: string) => void;
}

const tabs = [
  { id: "home", label: "Home", icon: FaHome },
  { id: "projects", label: "Projects", icon: IoSparkles },
];

const Tabs = ({ selectedTab, setSelectedTab }: TabsProps) => {
  return (
    <div className="flex items-center gap-1 p-1.5 rounded-full bg-[#191919] border border-white/10 shadow-lg shadow-black/20">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setSelectedTab(tab.id)}
          className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full font-medium text-sm transition-colors duration-300 ${
            selectedTab === tab.id
              ? "text-black"
              : "text-white/60 hover:text-white/80"
          }`}
          aria-label={`Navigate to ${tab.label}`}
        >
          {selectedTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-yellow-300 rounded-full"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <tab.icon className="relative z-10 text-base" />
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Tabs;
