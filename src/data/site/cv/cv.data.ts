import type {
  CvLanguageEntry,
  CvPersonalInfo,
  CvProjectEntry,
} from "./cv.interfaces";

export interface CvExperienceOverride {
  context: string;
  bullets: string[];
  stack: string[];
}

export interface CvProjectOverride {
  context: string;
  bullets: string[];
  stack: string[];
}

export const cvPersonalInfo: Partial<CvPersonalInfo> = {
  title: "Frontend & Mobile Engineer",
};

export const cvWebsiteLink = {
  label: "Website",
  href: "https://filipemendes.dev",
  displayValue: "filipemendes.dev",
};

export const cvExperienceOverrides: Record<string, CvExperienceOverride> = {
  "ACIN group::Frontend Developer": {
    context:
      "Contributed to migrating a legacy healthcare platform from server-rendered PHP to React, introducing API-driven workflows and establishing consistent behavior across devices.",
    bullets: [
      "Built React interfaces for admin dashboards, patient records and medication workflows.",
      "Implemented GraphQL queries and mutations for form submission, validation and pagination.",
      "Developed reusable form patterns and layout primitives for large, mobile-constrained workflows.",
      "Ported legacy PHP screens to React while maintaining parallel old and new interfaces.",
    ],
    stack: ["React", "TypeScript", "GraphQL", "Styled Components"],
  },
  "Nearsoft::Mobile Developer": {
    context:
      "Worked on mobile banking applications from initial development to release, covering core financial workflows under production constraints.",
    bullets: [
      "Built React Native interfaces across account management, transfers, payments, and debit card features.",
      "Integrated REST APIs handling authentication, request mapping, pagination, and error states.",
      "Improved flow modularity and shared component structure to reduce duplication across screens.",
      "Participated in App Store and Google Play release processes.",
    ],
    stack: ["React Native", "TypeScript", "REST APIs"],
  },
  "INOV::Software Engineer": {
    context:
      "Worked on applied computer vision research for infrared-based object detection and classification in surveillance systems.",
    bullets: [
      "Built an infrared-based detection system for identifying people, vehicles, and deer.",
      "Collected, labeled, and curated datasets, including organizing on-site data acquisition.",
      "Trained and evaluated models using TensorFlow and supported deployment into a C# inference application using OpenCV.",
    ],
    stack: ["Python", "TensorFlow", "CUDA", "OpenCV", "Computer Vision"],
  },
};

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
