import type { ProjectBranding } from "../../../../../components/projects/ProjectLogoMark";

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
  branding: ProjectBranding;
  category: string;
  positioning: string;
  description: string;
  isMobileApp: boolean;
  storeLinks?: ProjectDetailStoreLinks;
  links: ProjectDetailHeroLink[];
}

export interface ProjectDetailHeroProps {
  hero: ProjectDetailHeroData;
}
