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
    "MSc in Engineering Physics with experience building web and mobile products.",
    "Background across healthcare, banking and independent software development.",
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
                }`,
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
      "Launched Arc Timer, a cross-platform React Native workout application for iOS and Android, developed end-to-end from concept to App Store and Google Play release.",
    bullets: [
      "Built the application using React Native, Expo Router and TypeScript, delivering a single codebase for iOS and Android.",
      "Designed the application’s data layer using SQLite, Drizzle ORM and TanStack Query, enabling reliable local storage and efficient data management.",
      "Owned the complete product lifecycle from feature planning to store release, validating database services with Jest to ensure reliable application behavior.",
    ],
    stack: [
      "React Native",
      "Expo Router",
      "React Reanimated",
      "TypeScript",
      "TanStack Query",
      "Jest",
    ],
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
  Frontend: [
    "React",
    "React Native",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "HTML",
    "CSS",
  ],
  "State Management": ["Redux", "Zustand", "TanStack Query"],
  "Data & APIs": ["GraphQL", "REST APIs", "Postman"],
  Testing: ["Playwright", "Jest"],
  "UI & Animation": ["Styled Components", "Framer Motion", "React Reanimated"],
  Tools: ["Git", "Figma", "Cursor", "Codex"],
  // Other: ["Python", "TensorFlow", "OpenCV"],
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
    displayValue: entry.href.replace(/^https?:\/\//u, ""),
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
