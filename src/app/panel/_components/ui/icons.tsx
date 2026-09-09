import { HugeiconsIcon } from "@hugeicons/react";
import type { ComponentProps } from "react";

// Named icon set used across the panel. Importing specific icons keeps the
// bundle tree-shaken — only these ship, not the whole HugeIcons catalog.
export {
  Home03Icon,
  Task01Icon,
  FolderLibraryIcon,
  UserGroup03Icon,
  Structure01Icon,
  UserCircleIcon,
  Add01Icon,
  Cancel01Icon,
  Delete02Icon,
  Calendar03Icon,
  Logout01Icon,
  CheckmarkCircle02Icon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  Tick02Icon,
  PencilEdit02Icon,
  ShieldUserIcon,
  Flag02Icon,
  Clock01Icon,
  SentIcon,
  InboxIcon,
  Briefcase01Icon,
  Location01Icon,
  JobSearchIcon,
  Rocket01Icon,
  TestTube01Icon,
  Target01Icon,
  Idea01Icon,
  Analytics01Icon,
} from "@hugeicons/core-free-icons";

export type HugeIcon = ComponentProps<typeof HugeiconsIcon>["icon"];

/** Consistent HugeIcons wrapper — 1.5 stroke by default, matches our line weight. */
export function Icon({
  icon,
  size = 18,
  strokeWidth = 1.5,
  className,
}: {
  icon: HugeIcon;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <HugeiconsIcon
      icon={icon}
      size={size}
      strokeWidth={strokeWidth}
      className={className}
    />
  );
}
