import type { ProjectLogo } from "../../../../components/projects/ProjectLogoMark";

export interface DocsSidebarNavItemProps {
  logo?: ProjectLogo;
  compactLabel?: string;
  href: string;
  isActive: boolean;
  isHighlighted?: boolean;
  label: string;
  isNested?: boolean;
  onClick: () => void;
}
