import type { WorkItem, WorkItemId } from "../../../utils/workData";

export type ProjectNavigatorProps = {
  items: WorkItem[];
  activeId: WorkItemId | null;
  onSelect: (id: WorkItemId) => void;
  onMobileOpenChange: (open: boolean) => void;
};

export type ProjectNavigatorViewProps = Pick<
  ProjectNavigatorProps,
  "items" | "activeId" | "onSelect"
>;
