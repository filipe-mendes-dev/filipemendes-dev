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

export interface CvExperienceEntry {
  role: string;
  company: string;
  period: string;
  location?: string;
  summary: string;
  highlights?: string[];
}

export interface CvEducationEntry {
  title: string;
  institution: string;
  period: string;
  details?: string;
}

export interface CvSkillGroup {
  title: string;
  items: string[];
}

export interface CvLanguageEntry {
  name: string;
  proficiency: string;
}

export interface CvProfileItem {
  title: string;
  description: string;
}

export interface CvDocumentData {
  personalInfo: CvPersonalInfo;
  contactLinks: CvContactLink[];
  experience: CvExperienceEntry[];
  education: CvEducationEntry[];
  skillGroups: CvSkillGroup[];
  languages: CvLanguageEntry[];
  profileItems: CvProfileItem[];
}
