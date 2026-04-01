export interface DocPageRailSectionItem {
  id: string;
  title: string;
}

export interface DocPageRailProps {
  lastUpdatedLabel?: string;
  projectName?: string;
  projectSlug?: string;
  sections: DocPageRailSectionItem[];
}

export interface DocPageRailItemProps {
  href: string;
  label: string;
}
