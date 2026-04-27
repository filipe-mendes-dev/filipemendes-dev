import {
  getProjectHref,
  getProjectModuleBySlug,
  projectModules,
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
  experienceSummary: "3+ years experience",
  summaryLines: [
    "Engineering Physics graduate specialized in web and mobile development.",
    "Currently expanding into end-to-end product development.",
  ],
};

const mapProjectEntries = (): CvProjectEntry[] => {
  return projectModules
    .filter((projectModule) => projectModule.isDemo !== true)
    .map((projectModule) => {
      const { project } = projectModule;
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
  "filipemendes-dev": {
    context:
      "Designed and built a portfolio platform for presenting projects, documentation and a developer profile.",
    bullets: [
      "Next.js App Router architecture with server-rendered pages for landing, project and documentation flows.",
      "Motion-driven UI using Framer Motion for layout transitions and content sequencing across the platform.",
      "Multi-surface structure combining projects, documentation and profile content within a single application.",
    ],
    stack: ["Next.js", "TypeScript", "App Router", "CSS Modules"],
  },
};

export const cvSkills: Record<string, string[]> = {
  "Core Stack": ["React", "React Native", "Next.js", "TypeScript"],
  Workflow: ["Cursor", "Codex", "Git"],
  "Libraries & Tools": [
    "React Reanimated",
    "Framer Motion",
    "GraphQL",
    "REST APIs",
  ],
  Other: ["Python", "TensorFlow", "OpenCV", "Figma"],
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
    experienceSummary: cvPersonalInfo.experienceSummary,
    summaryLines: cvPersonalInfo.summaryLines,
  },
  contactLinks: cvContactLinks,
  projects: mapProjectEntries(),
  skills: cvSkills,
  languages: cvLanguages,
};
