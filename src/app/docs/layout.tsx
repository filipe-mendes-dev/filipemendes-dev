import type { ReactElement, ReactNode } from "react";

import { DocsShell } from "../../components/docs/DocsShell";
import {
  getDocsProjects,
  getFeaturedDocs,
} from "../../data/docs/docs.registry";
import { portfolio } from "../../data/portfolio";

interface DocsLayoutProps {
  children: ReactNode;
}

const DocsLayout = ({ children }: DocsLayoutProps): ReactElement => {
  return (
    <DocsShell
      descriptor={portfolio.descriptor}
      featuredDocs={getFeaturedDocs()}
      projects={getDocsProjects()}
      siteTitle={portfolio.siteTitle}
    >
      {children}
    </DocsShell>
  );
};

export default DocsLayout;
