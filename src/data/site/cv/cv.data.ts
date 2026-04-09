import {
  getProjectHref,
  getProjectModuleBySlug,
  projectsData,
} from "../../projects";
import { personData } from "../person.data";
import { profileData } from "../profile.data";
import type {
  CvContactLink,
  CvDocumentData,
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

const mapProjectEntries = (): CvProjectEntry[] => {
  const sharedProjects = projectsData.map((project) => {
    const override = cvProjectOverrides[project.slug];
    const detail = getProjectModuleBySlug(project.slug)?.detail;

    return {
      title: project.name,
      type: project.category,
      context:
        override?.context ?? detail?.hero.description ?? project.description,
      bullets:
        override?.bullets ??
        detail?.keyFeatures
          .slice(0, 3)
          .map(
            (item) =>
              `${item.title}${
                item.description !== undefined ? ` — ${item.description}` : ""
              }`
          ) ??
        [],
      stack: override?.stack ?? detail?.techStack ?? [],
      href: getProjectHref(project.slug),
    };
  });

  return [...sharedProjects, ...cvStandaloneProjects];
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

export const cvContactLinks: CvContactLink[] = [
  {
    label: "Email",
    href: `mailto:${profileData.email}`,
    displayValue: profileData.email,
    kind: "email",
  },
  {
    label: "Website",
    href: profileData.website.href,
    displayValue: profileData.website.displayValue,
    kind: "external",
  },
  ...profileData.socials.map((entry) => ({
    label: entry.label,
    href: entry.href,
    displayValue: entry.displayValue,
    kind: entry.kind,
  })),
];

export const cvData: CvDocumentData = {
  personalInfo: {
    name: personData.name,
    title: cvPersonalInfo.title ?? "Frontend & Mobile Engineer",
    location: personData.location,
  },
  contactLinks: cvContactLinks,
  projects: mapProjectEntries(),
  languages: cvLanguages,
};
