import type { SectionId } from "../shared/navigation/sections";

export interface NavigationItem {
  label: string;
  href: string;
  sectionId?: SectionId;
}

export interface ActionLink {
  label: string;
  href: string;
  sectionId?: SectionId;
  variant: "primary" | "secondary" | "ghost";
}

export interface HeroContent {
  name: string;
  role: string;
  summary: string;
  now: string;
  photoAlt: string;
  photoUrl: string;
  photoSrcSet: string;
  photoSizes: string;
  actions: ActionLink[];
}

export interface ProjectNarrative {
  problem: string;
  approach: string;
  stack: string;
  outcome: string;
}

export interface ProjectListItem {
  href: string;
  name: string;
  logoText: string;
  category: string;
  description: string;
  narrative: ProjectNarrative;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  summary: string;
}

export interface EducationItem {
  title: string;
  period?: string;
  details?: string;
}

export interface PublicationItem {
  title: string;
  venue?: string;
  year?: string;
  href?: string;
}

export interface AboutContent {
  profile: string;
  experience: ExperienceItem[];
  skills: string[];
  education: EducationItem[];
  publications: PublicationItem[];
  principles: string[];
}

export interface ContactContent {
  intro: string;
  email: string;
  availability: string;
  socials: SocialLink[];
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface PortfolioContent {
  siteTitle: string;
  descriptor: string;
  navigation: NavigationItem[];
  hero: HeroContent;
  projects: ProjectListItem[];
  about: AboutContent;
  contact: ContactContent;
}

export const portfolio: PortfolioContent = {
  siteTitle: "Filipe Mendes",
  descriptor: "Frontend Engineer - Systems & AI",
  navigation: [
    { label: "Home", href: "/", sectionId: "home" },
    { label: "Projects", href: "/", sectionId: "projects" },
    { label: "About Me", href: "/", sectionId: "about" },
    { label: "Contact", href: "/", sectionId: "contact" },
  ],
  hero: {
    name: "Filipe Mendes",
    role: "Systems-minded frontend engineer building product interfaces with AI-aware architecture.",
    summary:
      "I design and ship interface systems that connect product strategy, robust frontend foundations, and practical AI capabilities. My work focuses on clarity, maintainability, and measurable outcomes.",
    now: "Now: leading frontend architecture and AI-assisted product delivery.",
    photoAlt: "Portrait of Filipe Mendes",
    photoUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
    photoSrcSet:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80 500w, https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80 900w",
    photoSizes: "(min-width: 64rem) 192px, (min-width: 48rem) 176px, 152px",
    actions: [
      {
        label: "View Projects",
        href: "/",
        sectionId: "projects",
        variant: "primary",
      },
      {
        label: "Contact",
        href: "/",
        sectionId: "contact",
        variant: "secondary",
      },
    ],
  },
  projects: [
    {
      href: "/projects/atlas-mobile",
      name: "Atlas Mobile",
      logoText: "AT",
      category: "Mobile Product",
      description:
        "A field operations app that helps distributed teams capture tasks, sync updates, and close work loops from mobile devices.",
      narrative: {
        problem:
          "Field teams were losing context between job sites and office systems, causing delays and duplicated follow-ups.",
        approach:
          "Built an offline-first mobile experience with predictable task flows, tight API contracts, and audit-friendly state transitions.",
        stack:
          "React Native, TypeScript, TanStack Query, Node.js APIs, PostgreSQL, CI/CD via GitHub Actions.",
        outcome:
          "Reduced task completion time by 28% and improved same-day reporting consistency across teams.",
      },
    },
    {
      href: "/projects/forge-web",
      name: "Forge Web Console",
      logoText: "FG",
      category: "Web Product",
      description:
        "A control console for product teams to monitor releases, inspect behavior, and coordinate response across environments.",
      narrative: {
        problem:
          "Teams lacked a shared source of truth for release health and incident context during rapid deployment cycles.",
        approach:
          "Designed a calm information architecture with deterministic status surfaces and explicit ownership pathways.",
        stack:
          "React, TypeScript, Vite, CSS Modules, GraphQL, feature-flag pipeline integrations.",
        outcome:
          "Cut mean time to identify release regressions and improved cross-team incident handoff quality.",
      },
    },
  ],
  about: {
    profile:
      "I work at the intersection of product design, frontend systems, and AI-enabled delivery. I optimize for resilient architectures and practical interfaces that remain clear under real-world constraints.",
    experience: [
      {
        role: "Senior Frontend Engineer",
        company: "Product Systems Studio",
        period: "2022 - Present",
        summary:
          "Lead architecture for multi-surface products, with focus on design systems and AI-assisted workflows.",
      },
      {
        role: "Frontend Engineer",
        company: "Platform Team",
        period: "2019 - 2022",
        summary:
          "Built shared UI primitives and delivery pipelines for customer-facing product lines.",
      },
    ],
    skills: [
      "TypeScript",
      "React",
      "UI Architecture",
      "Design Systems",
      "Product Strategy",
      "Applied AI",
    ],
    education: [
      {
        title: "B.Sc. in Computer Engineering",
        period: "2015 - 2018",
      },
      {
        title: "Advanced coursework in Human-Computer Interaction",
        period: "2018",
      },
    ],
    publications: [
      {
        title: "Designing Maintainable Frontend Systems for Multi-Surface Products",
        venue: "UI Engineering Notes",
        year: "2023",
        href: "https://example.com/publications/frontend-systems",
      },
      {
        title: "Practical AI Workflows in Product Interface Delivery",
        venue: "Applied Product Systems Review",
        year: "2024",
        href: "https://example.com/publications/ai-workflows",
      },
    ],
    principles: [
      "Clarity over novelty in interface decisions",
      "Small systems that scale by composition",
      "Product outcomes tied to technical decisions",
    ],
  },
  contact: {
    intro:
      "I collaborate on product platforms, frontend architecture, and AI-aware interface systems. If you are building software that needs both craft and rigor, let us talk.",
    email: "hello@example.com",
    availability:
      "Available for select consulting and product collaboration engagements.",
    socials: [
      { label: "GitHub", href: "https://github.com/" },
      { label: "LinkedIn", href: "https://www.linkedin.com/" },
    ],
  },
};
