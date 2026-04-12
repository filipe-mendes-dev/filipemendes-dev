import {
  createProjectMetadata,
  type ProjectDetailContent,
} from "../projects.interfaces";
import { project } from "./project.data";

export const projectDetail: ProjectDetailContent = {
  hero: {
    name: project.name,
    logo: project.logo,
    category: project.category,
    positioning:
      "Portfolio platform bringing together project pages, documentation and profile content in one application.",
    description:
      "Designed and built a portfolio platform for presenting projects, documentation and a developer profile.",
    isMobileApp: false,
    links: [
      {
        label: "Homepage",
        href: "/",
      },
      {
        label: "Docs",
        href: "/docs",
      },
      {
        label: "CV",
        href: "/cv",
      },
    ],
  },
  screenshots: {
    items: [],
  },
  keyFeatures: [
    {
      title: "Multi-surface product structure",
      description:
        "Combines landing, project detail, documentation and CV flows within a single portfolio application.",
    },
    {
      title: "Motion-led presentation",
      description:
        "Uses Framer Motion for section reveals and content sequencing across the browsing experience.",
    },
    {
      title: "Structured project storytelling",
      description:
        "Presents each project through dedicated detail content instead of relying only on summary cards.",
    },
  ],
  implementationDetails: [
    {
      title: "Next.js App Router composition",
      description:
        "Uses server-rendered route boundaries with thin route files delegating UI composition to dedicated views.",
    },
    {
      title: "Shared project module registry",
      description:
        "Centralizes project metadata so landing cards, CV entries and project detail pages reuse the same source of truth.",
    },
    {
      title: "Scoped styling system",
      description:
        "Builds the interface with CSS Modules and shared theme tokens carried through CSS custom properties.",
    },
  ],
  techStack: [
    "Next.js",
    "TypeScript",
    "App Router",
    "Framer Motion",
    "CSS Modules",
  ],
  metadata: createProjectMetadata(
    project.name,
    "A portfolio website built with Next.js App Router to present projects, documentation and developer profile content in a single product surface."
  ),
};
