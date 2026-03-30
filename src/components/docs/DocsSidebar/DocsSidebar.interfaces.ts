import type {
  DocsProjectSummary,
  DocSummary,
} from '../../../data/docs/docs.interfaces';

export interface DocsSidebarProps {
  descriptor: string;
  featuredDocs: DocSummary[];
  projects: DocsProjectSummary[];
  siteTitle: string;
}
