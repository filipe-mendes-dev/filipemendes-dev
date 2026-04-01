import type { ProjectLogo } from "../../../../components/projects/ProjectLogoMark";

export interface DocsSidebarAccordionItem {
  logo?: ProjectLogo;
  compactLabel?: string;
  href: string;
  isActive: boolean;
  label: string;
}

export interface DocsSidebarAccordionProps {
  isExpanded: boolean;
  items: DocsSidebarAccordionItem[];
  label: string;
  onItemClick: () => void;
  onToggle: () => void;
}
