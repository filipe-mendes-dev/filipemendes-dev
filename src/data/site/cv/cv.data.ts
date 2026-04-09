import type { CvLanguageEntry, CvPersonalInfo } from "./cv.interfaces";

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
      "Personal workout timer application covering setup, execution, and session tracking.",
    bullets: [
      "Built the full workout flow from setup to active execution, interval control, and run tracking.",
      "Implemented deterministic session progression for exercise, rest, and transition states.",
      "Structured the app around reusable session logic and file-based workout reuse instead of isolated timer screens.",
    ],
    stack: ["React Native", "Expo Router", "React Reanimated", "TypeScript"],
  },
};

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
