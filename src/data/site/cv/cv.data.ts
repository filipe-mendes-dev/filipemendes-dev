import { contactData } from "../landing-page/contact.data";
import { getProjectHref, projectsData } from "../../projects";
import { educationData } from "../education.data";
import { experienceData } from "../experience.data";
import { personData } from "../person.data";
import { publicationsData } from "../publications.data";
import type {
  CvContactLink,
  CvDocumentData,
  CvEducationEntry,
  CvExperienceEntry,
  CvLanguageEntry,
  CvProjectEntry,
  CvPublicationEntry,
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
  };
});

const projects: CvProjectEntry[] = projectsData.map((project) => {
  return {
    name: project.name,
    category: project.category,
    description: project.description,
    href: getProjectHref(project.slug),
  };
});

const publications: CvPublicationEntry[] = publicationsData.map((entry) => {
  return {
    title: entry.title,
    venue: entry.venue,
    year: entry.year,
    href: entry.href,
  };
});

const skillGroups: CvSkillGroup[] = [
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Motion"],
  },
  {
    title: "Mobile",
    items: ["React Native", "Reanimated"],
  },
  {
    title: "Daily Tools",
    items: ["Cursor", "Codex", "Figma"],
  },
];

const languages: CvLanguageEntry[] = [
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
    title: "Frontend & Mobile Engineer",
    location: personData.currentStatus,
    availability: contactData.availability,
  },
  contactLinks,
  experience,
  projects,
  publications,
  education,
  skillGroups,
  languages,
};
