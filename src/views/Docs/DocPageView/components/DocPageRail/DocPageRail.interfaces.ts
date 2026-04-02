import type { ProjectLogo } from "../../../../../components/projects/ProjectLogoMark";

export interface DocPageRailSectionItem {
  id: string;
  title: string;
}

export interface DocPageRailProps {
  lastUpdatedLabel?: string;
  logo?: ProjectLogo;
  projectName?: string;
  projectSlug?: string;
  sections: DocPageRailSectionItem[];
}

export interface DocPageRailItemProps {
  href: string;
  label: string;
}
