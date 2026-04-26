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
    title: "Website Surfaces",
    items: [
      {
        id: "filipemendes-dev-homepage",
        alt: "Homepage hero with profile photo, primary actions and project cards.",
        caption: "Landing page visual direction and content hierarchy.",
        url: "/images/projects/filipemendes-dev/Homepage.png",
      },
      {
        id: "filipemendes-dev-arc-timer-project",
        alt: "Arc Timer project detail page with hero copy and screenshot gallery.",
        caption: "Project detail presentation for a real product entry.",
        url: "/images/projects/filipemendes-dev/Arc_Timer_Project.png",
      },
      {
        id: "filipemendes-dev-docs",
        alt: "Documentation page with sidebar navigation, article content and page index.",
        caption: "Documentation surface with sidebar navigation and article layout.",
        url: "/images/projects/filipemendes-dev/Docs.png",
      },
      {
        id: "filipemendes-dev-theme-comparison",
        alt: "About Me section shown in dark and light themes with a diagonal split.",
        caption: "Theme variation across the same interface section.",
        url: "/images/projects/filipemendes-dev/Theme_Comparison.png",
      },
    ],
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
