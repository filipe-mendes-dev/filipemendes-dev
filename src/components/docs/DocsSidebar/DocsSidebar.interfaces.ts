import type {
  DocsProjectSummary,
  DocSummary,
} from '../../../data/docs/docs.interfaces';

export interface DocsSidebarProps {
  descriptor: string;
  featuredDocs: DocSummary[];
  isExpanded: boolean;
  onClose: () => void;
  onToggleExpanded: () => void;
  projects: DocsProjectSummary[];
  siteTitle: string;
}
