import type { Metadata } from "next";

import type { ProjectLogo } from "../../components/projects/ProjectLogoMark";
import type { Doc } from "../docs/docs.interfaces";
import {
  createOpenGraphMetadata,
  createTwitterMetadata,
} from "../site/site.metadata";
import { siteData } from "../site/site.data";
import type {
  ProjectDetailHeroData,
  ProjectScreenshotItem,
} from "../../views/ProjectPages/ProjectDetailPage";

export interface ProjectRecord {
  id: string;
  slug: string;
  name: string;
  logo: ProjectLogo;
  category: string;
  description: string;
  isProfessional?: boolean;
}

export interface LandingProjectData {
  id: string;
  href: string;
  name: string;
  logo: ProjectLogo;
  category: string;
  description: string;
  isProfessional?: boolean;
}

export interface ProjectDetailContent {
  hero: ProjectDetailHeroData;
  screenshots: ProjectDetailScreenshotsContent;
  keyFeatures: ProjectDetailFeatureItem[];
  implementationDetails: ProjectDetailFeatureItem[];
  techStack: string[];
  metadata: Metadata;
}

export interface ProjectDetailFeatureItem {
  title: string;
  description?: string;
}

export interface ProjectDetailScreenshotsContent {
  items: ProjectScreenshotItem[];
  title?: string;
  subtitle?: string;
}

export interface ProjectDocsContent {
  description: string;
  order: number;
  documents: Doc[];
}

export interface ProjectModule {
  project: ProjectRecord;
  detail?: ProjectDetailContent;
  docs?: ProjectDocsContent;
  isDemo?: boolean;
  isVisibleOnLanding?: boolean;
}

export const getProjectHref = (slug: string): string => {
  return `/projects/${slug}`;
};

export const toLandingProjectData = (
  project: ProjectRecord
): LandingProjectData => {
  return {
    id: project.id,
    href: getProjectHref(project.slug),
    name: project.name,
    logo: project.logo,
    category: project.category,
    description: project.description,
    isProfessional: project.isProfessional,
  };
};

export const createProjectMetadata = (
  projectName: string,
  description: string
): Metadata => {
  const title = `${projectName} | ${siteData.siteTitle}`;

  return {
    title,
    description,
    openGraph: createOpenGraphMetadata(title, description, "article"),
    twitter: createTwitterMetadata(title, description),
  };
};
