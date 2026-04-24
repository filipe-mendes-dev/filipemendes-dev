import {
  createProjectPageMetadata,
  type ProjectDetailContent,
} from "../projects.interfaces";
import { project } from "./project.data";

export const projectDetail: ProjectDetailContent = {
  hero: {
    name: project.name,
    logo: project.logo,
    category: project.category,
    summary:
      "Portfolio platform presenting projects, documentation and a developer profile.",
    description:
      "Designed and built to showcase frontend engineering work through project pages, technical docs and personal presentation.",
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
      title: "Multi-surface architecture",
      description:
        "Browse landing, project, docs, and CV flows from one shared content model.",
    },
    {
      title: "SSR-aware theme engine",
      description:
        "Load persisted theme selection before first paint to avoid visible flicker.",
    },
    {
      title: "Typed content system",
      description:
        "Author project and docs content as TypeScript modules with compile-time checks.",
    },
    {
      title: "Print-aware CV rendering",
      description:
        "Render the CV with screen and print variants tuned for browser-to-PDF output.",
    },
    {
      title: "Accessibility-first animation",
      description:
        "Apply shared motion patterns while respecting reduced-motion preferences site-wide.",
    },
    {
      title: "Per-project detail pages",
      description:
        "Present each project through dedicated pages with features and implementation notes.",
    },
  ],
  implementationDetails: [
    {
      title: "Routes as pure entry points",
      description:
        "App Router entry files stay thin and delegate composition to view modules.",
    },
    {
      title: "Module-scoped project registry",
      description:
        "Project modules co-locate metadata, detail copy, and docs behind one registry.",
    },
    {
      title: "Cookie-based theme without flash",
      description:
        "Server-read theme cookies set initial HTML state before hydration to prevent flash.",
    },
    {
      title: "Shared motion config",
      description:
        "Shared motion tokens centralize durations, easing, and stagger values across components.",
    },
    {
      title: "CSS custom properties as design system",
      description:
        "CSS custom properties carry color, spacing, typography, and motion tokens through modules.",
    },
    {
      title: "Build-time sitemap from registries",
      description:
        "Project and docs registries generate sitemap entries automatically at build time.",
    },
  ],
  techStack: [
    "Next.js",
    "TypeScript",
    "App Router",
    "Framer Motion",
    "CSS Modules",
  ],
  pageMetadata: createProjectPageMetadata(
    project.name,
    "Portfolio platform presenting projects, documentation and a developer profile.",
    project.slug
  ),
};
