export const ROW_HEIGHT = 16;
export const MAGNIFICATION_RADIUS = 42;
export const MAX_MARKER_WIDTH = 44;
export const MAX_MARKER_HEIGHT = 6;

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const getInitials = (name: string) =>
  name
    .split(/\s|\./)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

export const getNavigationTarget = (
  key: string,
  currentIndex: number,
  itemCount: number,
) => {
  if (itemCount === 0) return null;
  if (key === "ArrowDown") return (currentIndex + 1) % itemCount;
  if (key === "ArrowUp") return (currentIndex - 1 + itemCount) % itemCount;
  if (key === "Home") return 0;
  if (key === "End") return itemCount - 1;
  return null;
};
