"use client";

import DesktopProjectNavigator from "./DesktopProjectNavigator";
import MobileProjectNavigator from "./MobileProjectNavigator";
import type { ProjectNavigatorProps } from "./types";

const ProjectNavigator = (props: ProjectNavigatorProps) => (
  <>
    <DesktopProjectNavigator
      items={props.items}
      activeId={props.activeId}
      onSelect={props.onSelect}
    />
    <MobileProjectNavigator {...props} />
  </>
);

export default ProjectNavigator;
