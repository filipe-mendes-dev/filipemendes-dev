import {
  getProjectHref,
  getProjectModuleBySlug,
  projectsData,
} from "../../projects";
import { contactData } from "../landing-page/contact.data";
import { personData } from "../person.data";
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

const cvWebsiteLink: CvContactLink = {
  label: "Website",
  href: "https://filipemendes.dev",
  displayValue: "filipemendes.dev",
  kind: "external",
};

const cvSocialDisplayValues: Record<string, CvContactLink> = {
  LinkedIn: {
    label: "LinkedIn",
    href: "https://linkedin.com/in/mendes-filipe-dev",
    displayValue: "mendes-filipe-dev",
    kind: "linkedin",
  },
  GitHub: {
    label: "GitHub",
    href: "https://github.com/filipe-mendes-dev",
    displayValue: "filipe-mendes-dev",
    kind: "github",
  },
};

const mapContactLinks = (): CvContactLink[] => {
  const socialLinks = contactData.socials
    .map((entry) => {
      const mappedEntry = cvSocialDisplayValues[entry.label];

      if (mappedEntry === undefined) {
        return null;
      }

      return {
        ...mappedEntry,
        href: entry.href,
      };
    })
    .filter((entry): entry is CvContactLink => entry !== null);

  return [
    {
      label: "Email",
      href: `mailto:${contactData.email}`,
      displayValue: contactData.email,
      kind: "email",
    },
    cvWebsiteLink,
    ...socialLinks,
  ];
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

export const cvData: CvDocumentData = {
  personalInfo: {
    name: personData.name,
    title: cvPersonalInfo.title ?? "Frontend & Mobile Engineer",
    location: personData.currentStatus,
  },
  contactLinks: mapContactLinks(),
  projects: mapProjectEntries(),
  languages: cvLanguages,
};
