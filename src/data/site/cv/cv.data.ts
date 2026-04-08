import { contactData } from "../landing-page/contact.data";
import { educationData } from "../education.data";
import { experienceData } from "../experience.data";
import { personData } from "../person.data";
import type {
  CvContactLink,
  CvDocumentData,
  CvEducationEntry,
  CvExperienceEntry,
  CvLanguageEntry,
  CvProfileItem,
  CvSkillGroup,
} from "./cv.interfaces";

const contactLinks: CvContactLink[] = [
  {
    label: "Email",
    href: `mailto:${contactData.email}`,
    displayValue: contactData.email,
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

const experience: CvExperienceEntry[] = experienceData.map((entry) => {
  const highlights: string[] =
    entry.company === "ACIN group"
      ? [
          "Built production healthcare workflows with React and TypeScript.",
          "Integrated GraphQL-driven data flows across responsive interfaces.",
        ]
      : entry.company === "Nearsoft"
      ? [
          "Delivered React Native banking features with a reliability focus.",
          "Contributed to shared UI patterns and API integration work.",
        ]
      : [
          "Worked on EfficientDet-based object detection research.",
          "Collected, labeled, and evaluated infrared datasets for publication.",
        ];

  return {
    role: entry.role,
    company: entry.company,
    period: entry.period,
    summary: entry.summary,
    highlights,
  };
});

const education: CvEducationEntry[] = educationData.map((entry) => {
  return {
    title: entry.title,
    institution: "Instituto Superior Técnico - Universidade de Lisboa",
    period: entry.period ?? "Completed",
    details: entry.details,
  };
});

const skillGroups: CvSkillGroup[] = [
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "GraphQL", "CSS Modules"],
  },
  {
    title: "Mobile",
    items: ["React Native", "Cross-platform UI", "REST API integration"],
  },
  {
    title: "Product Delivery",
    items: [
      "Design systems",
      "Component architecture",
      "Accessibility",
      "Performance",
    ],
  },
];

const languages: CvLanguageEntry[] = [
  {
    name: "Portuguese",
    proficiency: "Native",
  },
  {
    name: "English",
    proficiency: "Professional working proficiency",
  },
];

const profileItems: CvProfileItem[] = [
  {
    title: "Interaction quality",
    description:
      "Care about clear hierarchy, stable states, and detail work that holds up in production.",
  },
  {
    title: "Systems thinking",
    description:
      "Prefer maintainable UI structures, typed data flows, and reusable product decisions.",
  },
];

export const cvData: CvDocumentData = {
  personalInfo: {
    name: personData.name,
    title: "Frontend & Mobile Engineer",
    location: personData.currentStatus,
    availability: contactData.availability,
  },
  contactLinks,
  experience,
  education,
  skillGroups,
  languages,
  profileItems,
};
