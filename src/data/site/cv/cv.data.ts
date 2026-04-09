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
      "Mobile banking product focused on reliable flows, API integration, and reusable interface behavior.",
    bullets: [
      "Built React Native banking flows with predictable state transitions and clear user feedback.",
      "Integrated REST APIs into mobile screens and connected response data to reusable UI patterns.",
      "Structured shared component behavior so new flows could ship without duplicating interface logic.",
    ],
    stack: ["React Native", "TypeScript", "REST APIs"],
  },
  "INOV::Software Engineer": {
    context:
      "Applied machine learning research focused on infrared classification and object detection.",
    bullets: [
      "Built an EfficientDet-based pipeline for real-time infrared object detection research.",
      "Collected, labeled, and evaluated infrared datasets used for model training and validation.",
      "Structured the experimentation flow from dataset preparation to evaluation for reproducible publication work.",
    ],
    stack: ["Python", "EfficientDet", "Computer Vision"],
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
