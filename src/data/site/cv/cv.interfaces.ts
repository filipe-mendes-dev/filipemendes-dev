import type { EducationItem } from "../education.data";
import type { ExperienceItem } from "../experience.data";

export type CvProjectSlug = "arc-timer" | "filipemendes-dev";

export interface CvPersonalInfo {
  name: string;
  title: string;
  location: string;
  phone: string;
  experienceSummary?: string;
  summaryLines?: [string, string];
}

export interface CvContactLink {
  label: string;
  href: string;
  displayValue: string;
  kind: "email" | "external" | "github" | "linkedin";
}

export interface CvLanguageEntry {
  name: string;
  proficiency: string;
}

export interface CvProjectEntry {
  slug: CvProjectSlug;
  title: string;
  type?: string;
  timeframe?: string;
  location?: string;
  context: string;
  bullets: string[];
  stack: string[];
  href: string;
}

export interface CvDocumentData {
  personalInfo: CvPersonalInfo;
  contactLinks: CvContactLink[];
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: CvProjectEntry[];
  skills: Record<string, string[]>;
  languages: CvLanguageEntry[];
}
