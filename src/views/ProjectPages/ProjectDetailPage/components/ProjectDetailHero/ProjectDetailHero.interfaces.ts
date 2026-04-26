import type { ProjectLogo } from "../../../../../components/projects/ProjectLogoMark";

export interface ProjectDetailStoreLinks {
  appStore?: string;
  googlePlay?: string;
}

export interface ProjectDetailHeroLink {
  label: string;
  href: string;
}

export interface ProjectDetailHeroData {
  name: string;
  logo: ProjectLogo;
  category: string;
  summary: string;
  description: string;
  isMobileApp: boolean;
  storeLinks?: ProjectDetailStoreLinks;
  links: ProjectDetailHeroLink[];
}

export interface ProjectDetailHeroProps {
  hero: ProjectDetailHeroData;
}
