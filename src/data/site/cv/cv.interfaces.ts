export interface CvPersonalInfo {
  name: string;
  title: string;
  location: string;
  availability?: string;
  summary?: string;
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
  projects: CvProjectEntry[];
  languages: CvLanguageEntry[];
}
