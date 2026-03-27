import type {
  DocsProjectSummary,
  DocSummary,
} from '../../../data/docs/docs.interfaces';

export interface DocsSidebarProps {
  descriptor: string;
  featuredDocs: DocSummary[];
  isMobileOpen: boolean;
  onClose: () => void;
  onToggleMobileNavigation: () => void;
  projects: DocsProjectSummary[];
  siteTitle: string;
}
