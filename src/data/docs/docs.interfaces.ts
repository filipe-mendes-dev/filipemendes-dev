import type { ProjectLogo } from "../../components/projects/ProjectLogoMark";

export interface DocParagraphBlock {
  kind: 'paragraph';
  text: string;
}

export interface DocListBlock {
  kind: 'list';
  items: string[];
  ordered?: boolean;
}

export type DocContentBlock = DocParagraphBlock | DocListBlock;

export interface DocSection {
  id: string;
  title: string;
  content: DocContentBlock[];
}

export interface DocSummary {
  slug: string;
  title: string;
  summary: string;
  order: number;
  projectSlug: string;
  projectName: string;
  featured?: boolean;
}

export interface DocsProjectSummary {
  slug: string;
  name: string;
  logo: ProjectLogo;
  description: string;
  order: number;
}

export interface Doc extends DocSummary {
  lastUpdatedLabel?: string;
  sections: DocSection[];
}
