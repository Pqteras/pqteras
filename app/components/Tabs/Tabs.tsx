// Tabs.tsx
"use client";
import { SetStateAction } from "react";
import { FaHome } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import "./Tabs.scss";

interface TabsProps {
  selectedTab: string;
  setSelectedTab: (value: SetStateAction<string>) => void;
}

const Tabs = ({ selectedTab, setSelectedTab }: TabsProps) => {
  const handleTabChange = (event: any) => {
    setSelectedTab(event.target.id);
  };

  return (
    <div className="container select-none">
      <div className="tabs">
        <input
          type="radio"
          id="home"
          name="tabs"
          checked={selectedTab === "home"}
          onChange={handleTabChange}
        />
        <label className="tab gap-1" htmlFor="home">
          <FaHome className="text-xl" />
          Home
        </label>

        <input
          type="radio"
          id="projects"
          name="tabs"
          checked={selectedTab === "projects"}
          onChange={handleTabChange}
        />
        <label className="tab gap-1" htmlFor="projects">
          <IoSparkles className="text-xl" />
          Projects
        </label>

        <span className="glider" />
      </div>
    </div>
  );
};

export default Tabs;
