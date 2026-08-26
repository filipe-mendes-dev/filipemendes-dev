import { getProjectHref } from "../../projects";
import { project as arcTimerProject } from "../../projects/arc-timer/project.data";
import { project as portfolioProject } from "../../projects/filipemendes-dev/project.data";
import { educationData } from "../education.data";
import {
  experienceData,
  type ExperienceId,
  type ExperienceItem,
} from "../experience.data";
import { personData } from "../person.data";
import { profileData } from "../profile.data";
import type {
  CvContactLink,
  CvDocumentData,
  CvLanguageEntry,
  CvPersonalInfo,
  CvProjectEntry,
} from "./cv.interfaces";

interface CvExperienceOverride {
  bullets: string[];
  stack?: string[];
}

interface CvProjectContentOverride {
  context: string;
  bullets: string[];
  stack: string[];
}

const cvPersonalInfo: Omit<CvPersonalInfo, "title"> = {
  name: personData.name,
  location: personData.location,
  phone: profileData.phone,
  experienceSummary: "3+ years experience",
  summaryLines: [
    "MSc in Engineering Physics with experience building web and mobile products.",
    "Background across healthcare, banking and independent software development.",
  ],
};

const cvContactLinks: CvContactLink[] = [
  {
    label: "Email",
    href: `mailto:${profileData.email}`,
    displayValue: profileData.email,
    kind: "email",
  },
  ...profileData.socials.map((entry) => ({
    label: entry.label,
    href: entry.href,
    displayValue: entry.href.replace(/^https?:\/\//u, ""),
    kind: entry.kind,
  })),
  {
    label: "Website",
    href: profileData.website.href,
    displayValue: profileData.website.displayValue,
    kind: "external",
  },
];

const cvLanguages: CvLanguageEntry[] = [
  {
    name: "Portuguese",
    proficiency: "Native",
  },
  {
    name: "English",
    proficiency: "C1",
  },
];

const frontendExperienceData: ExperienceItem[] = experienceData;

const fullStackExperienceOverrides: Partial<
  Record<ExperienceId, CvExperienceOverride>
> = {
  acin: {
    bullets: [
      "Integrated GraphQL APIs for authentication, form submission and paginated data workflows.",
      "Collaborated with backend engineers to refine GraphQL schemas and reusable data contracts.",
      "Built React and TypeScript interfaces for administration, patient and prescription workflows.",
    ],
  },
  nearsoft: {
    bullets: [
      "Integrated REST APIs for authentication, transactions and structured error handling.",
      "Managed application state with Redux across account, transfer and payment workflows.",
      "Prepared production builds and contributed to App Store and Google Play releases.",
    ],
  },
  inov: {
    bullets: [
      "Built an infrared detection system for identifying people, vehicles and deer.",
      "Trained TensorFlow models and supported C# inference integration using OpenCV.",
    ],
  },
};

const fullStackExperienceData: ExperienceItem[] = experienceData.map(
  (entry) => {
    const override = fullStackExperienceOverrides[entry.id];

    if (override === undefined) {
      return entry;
    }

    return {
      ...entry,
      ...override,
    };
  },
);

const frontendProjectsData: CvProjectEntry[] = [
  {
    slug: "arc-timer",
    title: arcTimerProject.name,
    type: arcTimerProject.category,
    timeframe: "June 2026",
    context:
      "Launched Arc Timer, a cross-platform React Native workout application for iOS and Android, developed end-to-end from concept to App Store and Google Play release.",
    bullets: [
      "Built the application using React Native, Expo Router and TypeScript, delivering a single codebase for iOS and Android.",
      "Implemented state-based workout execution and UI-thread animations with React Reanimated.",
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
    href: getProjectHref(arcTimerProject.slug),
  },
  {
    slug: "filipemendes-dev",
    title: portfolioProject.name,
    type: portfolioProject.category,
    timeframe: "April 2026",
    context:
      "Launched filipemendes.dev, a Next.js portfolio platform showcasing projects, technical documentation and my developer profile.",
    bullets: [
      "Built the platform using Next.js, App Router, React Server Components and TypeScript, delivering server-rendered pages across the application.",
      "Implemented responsive interfaces using CSS Modules and Framer Motion, creating smooth page transitions and interactive user experiences.",
      "Managed production deployment with Vercel, configuring the custom domain, DNS records and professional webmail for a complete production setup.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "App Router",
      "React Server Components",
      "CSS Modules",
      "Framer Motion",
      "Vercel",
    ],
    href: getProjectHref(portfolioProject.slug),
  },
];

const fullStackProjectOverrides: Partial<
  Record<CvProjectEntry["slug"], CvProjectContentOverride>
> = {
  "arc-timer": {
    context:
      "Built and released a cross-platform workout application covering local persistence, stateful execution, testing and mobile delivery.",
    bullets: [
      "Designed the local data layer with SQLite, Drizzle ORM and TanStack Query.",
      "Structured persistence services and validated database workflows with Jest integration tests.",
      "Implemented state-based workout execution and file sharing across stored training data.",
    ],
    stack: [
      "TypeScript",
      "React Native",
      "SQLite",
      "Drizzle ORM",
      "TanStack Query",
      "Jest",
    ],
  },
  "filipemendes-dev": {
    context:
      "Built and deployed a Next.js platform combining projects, technical documentation and shared site metadata.",
    bullets: [
      "Built server-rendered routes with Next.js App Router and React Server Components.",
      "Structured shared content sources for projects, documentation, metadata and sitemap generation.",
      "Managed Vercel deployment, custom DNS and production webmail configuration.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "App Router",
      "React Server Components",
      "Vercel",
    ],
  },
};

const fullStackProjectsData: CvProjectEntry[] = frontendProjectsData.map(
  (entry) => {
    const override = fullStackProjectOverrides[entry.slug];

    if (override === undefined) {
      return entry;
    }

    return {
      ...entry,
      ...override,
    };
  },
);

const frontendSkills: Record<string, string[]> = {
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

const fullStackSkills: Record<string, string[]> = {
  Languages: ["TypeScript", "JavaScript", "Python"],
  "Frontend & Application": ["React", "React Native", "Next.js"],
  "APIs & Data": [
    "GraphQL",
    "REST APIs",
    "SQLite",
    "Drizzle ORM",
    "TanStack Query",
  ],
  "AI & Computer Vision": ["TensorFlow", "OpenCV", "CUDA"],
  Testing: ["Jest", "Playwright"],
  Tools: ["Git", "Postman", "Vercel", "Cursor"],
};

const sharedCvData = {
  contactLinks: cvContactLinks,
  education: educationData,
  languages: cvLanguages,
} satisfies Pick<
  CvDocumentData,
  "contactLinks" | "education" | "languages"
>;

export const frontendCvData: CvDocumentData = {
  ...sharedCvData,
  personalInfo: {
    ...cvPersonalInfo,
    title: "Frontend & Mobile Engineer",
  },
  experience: frontendExperienceData,
  projects: frontendProjectsData,
  skills: frontendSkills,
};

export const fullStackCvData: CvDocumentData = {
  ...sharedCvData,
  personalInfo: {
    ...cvPersonalInfo,
    title: "Software Engineer",
  },
  experience: fullStackExperienceData,
  projects: fullStackProjectsData,
  skills: fullStackSkills,
};
