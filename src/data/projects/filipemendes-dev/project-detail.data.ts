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
      title: "Multi-page Portfolio Experience",
      description:
        "Separate routes for homepage, projects, docs and CV content.",
    },
    {
      title: "Structured Work Showcase",
      description:
        "Projects and profile content structured for clear, efficient review.",
    },
    {
      title: "Responsive Cross-Device Layouts",
      description:
        "Browse the same content cleanly across desktop, tablet and mobile.",
    },
    {
      title: "Printable CV Route",
      description:
        "CV route optimized for browser viewing and clean PDF export.",
    },
    {
      title: "Polished Interface Design",
      description:
        "Motion, spacing and hierarchy tuned for a cleaner reading flow.",
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
