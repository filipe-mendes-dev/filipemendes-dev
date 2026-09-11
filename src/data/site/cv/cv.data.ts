import { getProjectHref } from "../../projects";
import { project as arcTimerProject } from "../../projects/arc-timer/project.data";
import { project as portfolioProject } from "../../projects/filipemendes-dev/project.data";
import { educationData } from "../education.data";
import {
  experienceData,
  type ExperienceId,
} from "../experience.data";
import { personData } from "../person.data";
import { profileData } from "../profile.data";
import type {
  CvContactLink,
  CvDocumentData,
  CvExperienceEntry,
  CvLanguageEntry,
  CvPersonalInfo,
  CvProjectEntry,
} from "./cv.interfaces";

interface CvExperienceOverride {
  bullets: string[];
  bulletHighlights: string[][];
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

const frontendBulletHighlights: Record<ExperienceId, string[][]> = {
  acin: [
    ["React and TypeScript", "GraphQL APIs"],
    ["responsive and accessible interfaces", "semantic HTML and adaptive CSS"],
    ["GraphQL schemas", "reusable React components"],
    ["Cursor and GitHub Copilot"],
  ],
  nearsoft: [
    ["React Native and TypeScript", "REST APIs"],
    ["reusable React Native components", "Redux"],
    ["responsive mobile interfaces", "iOS and Android"],
    ["mentored a frontend intern"],
    ["production builds", "App Store and Google Play"],
  ],
  inov: [],
};

const experienceLocations: Record<
  ExperienceId,
  Pick<CvExperienceEntry, "location" | "workArrangement">
> = {
  acin: { location: "Madeira, Portugal", workArrangement: "Hybrid" },
  nearsoft: { location: "Madeira, Portugal", workArrangement: "On-site" },
  inov: { location: "Lisbon, Portugal", workArrangement: "Remote / Hybrid" },
};

const frontendExperienceData: CvExperienceEntry[] = experienceData.map(
  (entry) => ({
    ...entry,
    ...experienceLocations[entry.id],
    bulletHighlights: frontendBulletHighlights[entry.id],
  }),
);

const fullStackExperienceOverrides: Partial<
  Record<ExperienceId, CvExperienceOverride>
> = {
  acin: {
    bulletHighlights: [
      ["GraphQL schemas and API contracts"],
      ["Docker Compose", "Redis and MariaDB"],
      ["MariaDB with SQL"],
      ["React and TypeScript", "GraphQL APIs"],
    ],
    bullets: [
      "Collaborated with backend engineers to define and refine GraphQL schemas and API contracts, aligning API structure with frontend requirements.",
      "Used and debugged a multi-service Docker Compose environment with Redis and MariaDB, inspecting logs, running commands and managing environment variables to troubleshoot development issues.",
      "Queried and inspected relational data in MariaDB with SQL to validate application behavior and investigate data-related issues during development.",
      "Built React and TypeScript interfaces for admin dashboards, patient management and prescription workflows, integrating GraphQL APIs for authentication, form submission and paginated data views.",
    ],
    stack: [
      "React",
      "TypeScript",
      "GraphQL",
      "Docker / Docker Compose",
      "SQL",
      "Redis",
      "Playwright",
      "Git",
    ],
  },
  nearsoft: {
    bulletHighlights: [
      ["REST APIs", "OpenAPI specifications and Postman"],
      ["JWT access and refresh tokens", "Redux Saga middleware"],
      ["React Native and TypeScript"],
      ["mentored a frontend intern"],
      ["production builds", "App Store and Google Play"],
    ],
    bullets: [
      "Integrated REST APIs using OpenAPI specifications and Postman to validate API contracts and troubleshoot authentication, transaction and data-related issues.",
      "Implemented authentication flows using JWT access and refresh tokens, handling authenticated requests, token renewal and session persistence through Redux Saga middleware.",
      "Built React Native and TypeScript features for account management, transfers, payments and debit cards across mobile banking applications.",
      "Onboarded and mentored a frontend intern, introducing Git-based version control workflows and supporting day-to-day feature development.",
      "Prepared production builds and contributed to App Store and Google Play release submissions.",
    ],
    stack: [
      "React Native",
      "TypeScript",
      "REST APIs",
      "OpenAPI / Swagger",
      "JWT",
      "Redux Saga",
      "Postman",
      "Git",
    ],
  },
  inov: {
    bulletHighlights: [
      ["TensorFlow and Keras", "hyperparameters"],
      ["annotation, preprocessing and data augmentation"],
      ["Evaluated model performance", "generalization issues"],
      ["C#/OpenCV", "real-time inference"],
    ],
    bullets: [
      "Developed and trained neural networks with TensorFlow and Keras, experimenting with architectures, training configurations and hyperparameters to identify the best-performing models.",
      "Prepared training, validation and test datasets through annotation, preprocessing and data augmentation to support model training and experimentation.",
      "Evaluated model performance across different datasets, analyzing metrics, false predictions and generalization issues to compare models and guide further experimentation.",
      "Exported trained models and adapted a C#/OpenCV application for real-time inference, benchmarking accuracy and latency to meet production performance requirements.",
    ],
    stack: ["Python", "TensorFlow", "Keras", "CUDA", "C#", "OpenCV", "ONNX"],
  },
};

const fullStackExperienceData: CvExperienceEntry[] = frontendExperienceData.map(
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
    timeframe: "February - June 2026",
    maintenanceNote: "Maintained",
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
    timeframe: "February - April 2026",
    maintenanceNote: "Maintained",
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
      "Built the application using React Native, Expo Router and TypeScript, delivering a single codebase for iOS and Android.",
      "Implemented state-based workout execution and UI-thread animations with React Reanimated.",
      "Owned the complete product lifecycle from feature planning to store release, validating database services with Jest to ensure reliable application behavior.",
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
      "Built the platform using Next.js, App Router, React Server Components and TypeScript, delivering server-rendered pages across the application.",
      "Implemented responsive interfaces using CSS Modules and Framer Motion, creating smooth page transitions and interactive user experiences.",
      "Managed production deployment with Vercel, configuring the custom domain, DNS records and professional webmail for a complete production setup.",
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
  "Web & Mobile": ["React", "React Native", "TypeScript", "JavaScript", "Next.js", "App Router", "React Server Components", "Server-side Rendering", "Expo Router", "iOS", "Android"],
  "UI & Architecture": ["Semantic HTML", "CSS", "Responsive Design", "Accessibility", "Reusable Components", "System Design", "State Machines", "CSS Modules", "Styled Components", "Framer Motion", "React Reanimated"],
  "State & APIs": ["Redux", "Redux Saga", "Zustand", "TanStack Query", "Client-side Caching", "GraphQL", "REST APIs", "API Integration", "API Contracts", "OpenAPI / Swagger", "Authentication", "JWT", "Refresh Tokens", "Session Management", "Error Handling"],
  "Engineering & Delivery": ["Jest", "Playwright", "Automated Testing", "Integration Testing", "Debugging", "Performance Optimization", "Code Reviews", "Technical Documentation", "Git", "Vercel", "DNS Configuration", "App Store", "Google Play"],
  "Tools & Data": ["SQLite", "Drizzle ORM", "Local Persistence", "File Serialization", "Postman", "Figma", "Cursor", "GitHub Copilot", "Codex", "AI-assisted Development"],
};

const fullStackSkills: Record<string, string[]> = {
  "Languages & Applications": ["TypeScript", "JavaScript", "Python", "C#", "React", "React Native", "Next.js", "HTML", "CSS", "Responsive Design", "Accessibility", "React Server Components", "Server-side Rendering"],
  "APIs & Architecture": ["REST APIs", "GraphQL", "API Integration", "API Contracts", "OpenAPI / Swagger", "Authentication", "JWT", "Refresh Tokens", "Session Management", "Error Handling", "Redux", "Redux Saga", "Zustand", "TanStack Query", "System Design", "State Machines"],
  "Data & Environments": ["SQL", "Relational Databases", "MariaDB", "SQLite", "Drizzle ORM", "Local Persistence", "File Serialization", "Client-side Caching", "Docker", "Docker Compose", "Redis", "CLI", "Environment Configuration", "Log Analysis"],
  "ML & Computer Vision": ["TensorFlow", "Keras", "OpenCV", "CUDA", "ONNX", "Neural Networks", "Deep Learning", "Object Detection", "Classification", "Model Training", "Hyperparameter Tuning", "Dataset Preparation", "Data Augmentation", "Train / Validation / Test Splits", "Model Evaluation", "Generalization", "Model Export", "Real-time Inference", "Accuracy / Latency Benchmarking"],
  "Engineering & Delivery": ["Jest", "Playwright", "Automated Testing", "Integration Testing", "Debugging", "Performance Optimization", "Code Reviews", "Technical Documentation", "Git", "Postman", "Vercel", "DNS Configuration", "App Store", "Google Play", "Cursor", "GitHub Copilot", "Codex", "AI-assisted Development"],
};

const sharedCvData = {
  contactLinks: cvContactLinks,
  education: educationData,
  languages: cvLanguages,
} satisfies Pick<CvDocumentData, "contactLinks" | "education" | "languages">;

export const frontendCvData: CvDocumentData = {
  ...sharedCvData,
  personalInfo: {
    ...cvPersonalInfo,
    title: "Software Engineer",
    summary: "Frontend Engineer with around 4 years of software development experience and an MSc in Engineering Physics. Built healthcare and banking applications with React, React Native and TypeScript, and independently developed and released an iOS and Android app.",
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
    summary: "Software Engineer with around 4 years of experience across frontend, mobile and applied machine learning, with an MSc in Engineering Physics. Built healthcare and banking applications with React, React Native and TypeScript, with earlier experience developing computer vision systems in Python.",
  },
  experience: fullStackExperienceData,
  projects: fullStackProjectsData,
  skills: fullStackSkills,
};
