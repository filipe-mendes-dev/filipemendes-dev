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
        label: "GitHub",
        href: "https://github.com/filipe-mendes-dev/filipemendes-dev",
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
      title: "Hybrid Rendering Strategy",
      description:
        "Next.js routes use server rendering, static generation or client interactivity based on content needs.",
    },
    {
      title: "Cookie-Based Theme Sync",
      description:
        "Theme cookies keep server and client output aligned from first paint.",
    },
    {
      title: "Coordinated Motion System",
      description:
        "Shared Framer Motion patterns coordinate staggered transitions across pages and sections.",
    },
    {
      title: "Fluid Responsive Layouts",
      description:
        "Clamp-based sizing and media queries adapt spacing, type and layout across screen sizes.",
    },
    {
      title: "Automated Metadata & SEO",
      description:
        "Metadata, sitemap, robots and social previews are generated from shared content sources.",
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
