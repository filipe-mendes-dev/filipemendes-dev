import type { ReactNode } from 'react';

import type {
  DocsProjectSummary,
  DocSummary,
} from '../../../data/docs/docs.interfaces';

export interface DocsShellProps {
  children: ReactNode;
  descriptor: string;
  featuredDocs: DocSummary[];
  projects: DocsProjectSummary[];
  siteTitle: string;
}
