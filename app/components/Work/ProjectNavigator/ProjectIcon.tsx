import Image from "next/image";
import type { WorkItem } from "../../../utils/workData";
import { getInitials } from "./utils";

type ProjectIconProps = {
  item: WorkItem;
  size?: "small" | "medium";
};

const ProjectIcon = ({ item, size = "small" }: ProjectIconProps) => {
  const dimensions = size === "medium" ? "h-9 w-9" : "h-7 w-7";

  return (
    <span
      className={`relative grid shrink-0 place-items-center ${dimensions}`}
      aria-hidden="true"
    >
      {item.logo ? (
        <Image
          src={item.logo}
          alt=""
          width={36}
          height={36}
          className={`h-full w-full object-contain ${item.invertLogo ? "invert" : ""}`}
        />
      ) : (
        <span className="text-[10px] font-semibold tracking-tight text-yellow-300">
          {getInitials(item.name)}
        </span>
      )}
    </span>
  );
};

export default ProjectIcon;
