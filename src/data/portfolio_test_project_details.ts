import type { Metadata } from "next";

import { portfolio, type ProjectListItem } from "./portfolio_test";
import type { ProjectDetailHeroData } from "../views/ProjectPages/ProjectDetailPage";

export interface PortfolioTestProjectDetail {
  hero: ProjectDetailHeroData;
  keyFeatures: string[];
  architecture: string[];
  techStack: string[];
  metadata: Metadata;
}

const getProjectByHref = (href: string): ProjectListItem => {
  const project = portfolio.projects.find((item) => item.href === href);

  if (project === undefined) {
    throw new Error(`Missing test portfolio project for href: ${href}`);
  }

  return project;
};

const createMetadata = (
  project: ProjectListItem,
  description: string,
): Metadata => {
  const title = `${project.name} | ${portfolio.siteTitle}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
};

const atlasMobileProject = getProjectByHref("/projects/atlas-mobile");

export const atlasMobileDetail: PortfolioTestProjectDetail = {
  hero: {
    name: atlasMobileProject.name,
    logo: {
      logoText: atlasMobileProject.logoText,
    },
    category: atlasMobileProject.category,
    description: atlasMobileProject.description,
    positioning:
      "Positioning: reliable mobile workflows for operational teams with low-friction data entry.",
    isMobileApp: true,
    storeLinks: {
      appStore: "https://apps.apple.com/",
      googlePlay: "https://play.google.com/store",
    },
    links: [
      { label: "GitHub", href: "https://github.com/" },
      { label: "Product Docs", href: "https://example.com/docs" },
    ],
  },
  keyFeatures: [
    "Offline draft capture with conflict-safe sync",
    "Role-based task queues and escalation controls",
    "Structured notes with attachment pipelines",
  ],
  architecture: [
    "Client state split between local cache and validated server snapshots",
    "Queue-based sync worker with retry windows and observability events",
    "Design system tokens shared between product surfaces for consistency",
  ],
  techStack: [
    "React Native",
    "TypeScript",
    "TanStack Query",
    "Node.js",
    "PostgreSQL",
  ],
  metadata: createMetadata(atlasMobileProject, atlasMobileProject.description),
};

const forgeWebProject = getProjectByHref("/projects/forge-web");

export const forgeWebDetail: PortfolioTestProjectDetail = {
  hero: {
    name: forgeWebProject.name,
    logo: {
      logoText: forgeWebProject.logoText,
    },
    category: forgeWebProject.category,
    description: forgeWebProject.description,
    positioning:
      "Positioning: operational clarity for product and engineering teams running high-change systems.",
    isMobileApp: false,
    links: [
      { label: "Live Product", href: "https://example.com" },
      { label: "GitHub", href: "https://github.com/" },
    ],
  },
  keyFeatures: [
    "Environment health panels with drill-down context",
    "Release annotations mapped to deployment windows",
    "Ownership routing for technical response workflows",
  ],
  architecture: [
    "Composable frontend modules backed by typed GraphQL contracts",
    "Server-side normalization to reduce client-side branching complexity",
    "Observability hooks for tracing product behavior changes",
  ],
  techStack: ["React", "TypeScript", "Vite", "GraphQL", "Node.js"],
  metadata: createMetadata(forgeWebProject, forgeWebProject.description),
};
