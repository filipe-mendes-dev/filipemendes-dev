import type {
  DocsProjectSummary,
  DocSummary,
} from "../../../../data/docs/docs.interfaces";

export interface DocsSidebarContentProps {
  descriptor: string;
  featuredDocs: DocSummary[];
  isMobileOpen: boolean;
  onClose: () => void;
  projects: DocsProjectSummary[];
  siteTitle: string;
}
