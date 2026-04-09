import type {
  CvContactLink,
  CvLanguageEntry,
  CvPersonalInfo,
  CvProjectEntry,
} from "./cv.interfaces";

export interface CvProjectOverride {
  context: string;
  bullets: string[];
  stack: string[];
}

export const cvPersonalInfo: Partial<CvPersonalInfo> = {
  title: "Frontend & Mobile Engineer",
};

export const cvContactLinks: CvContactLink[] = [
  {
    label: "Email",
    href: "mailto:contact@filipemendes.dev",
    displayValue: "contact@filipemendes.dev",
    kind: "email",
  },
  {
    label: "Website",
    href: "https://filipemendes.dev",
    displayValue: "filipemendes.dev",
    kind: "external",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/mendes-filipe-dev",
    displayValue: "mendes-filipe-dev",
    kind: "linkedin",
  },
  {
    label: "GitHub",
    href: "https://github.com/filipe-mendes-dev",
    displayValue: "filipe-mendes-dev",
    kind: "github",
  },
];

export const cvProjectOverrides: Record<string, CvProjectOverride> = {
  "arc-timer": {
    context:
      "Designed and built a production-level mobile application covering the full workout lifecycle from setup to execution and tracking.",
    bullets: [
      "Cross-platform mobile architecture with React Native and Expo Router enabling fast iteration and consistent behavior.",
      "State-based timer system with a 1Hz update cycle ensuring predictable execution under runtime constraints.",
      "UI-thread animations with React Reanimated avoiding JavaScript thread blocking.",
    ],
    stack: ["React Native", "Expo Router", "React Reanimated", "TypeScript"],
  },
};

export const cvStandaloneProjects: CvProjectEntry[] = [
  {
    title: "filipemendes.dev",
    type: "Portfolio Website",
    context:
      "Designed and built a portfolio platform for presenting projects, documentation, and a developer profile.",
    bullets: [
      "Next.js App Router architecture with server-rendered pages for landing, project, and documentation flows.",
      "Motion-driven UI using Framer Motion for layout transitions and content sequencing across the platform.",
      "Multi-surface structure combining projects, documentation, and profile content within a single application.",
    ],
    stack: ["Next.js", "TypeScript", "App Router", "CSS Modules"],
    href: "/",
  },
];

export const cvLanguages: CvLanguageEntry[] = [
  {
    name: "Portuguese",
    proficiency: "Native",
  },
  {
    name: "English",
    proficiency: "C1",
  },
];
