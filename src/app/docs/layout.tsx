import type { ReactElement, ReactNode } from "react";

import { DocsShell } from "../../components/docs/DocsShell";
import {
  getDocsProjects,
  getFeaturedDocs,
} from "../../data/docs/docs.registry";
import { siteData } from "../../data/site/site.data";

interface DocsLayoutProps {
  children: ReactNode;
}

const DocsLayout = ({
  children,
}: DocsLayoutProps): ReactElement => {
  return (
    <DocsShell
      descriptor={siteData.descriptor}
      featuredDocs={getFeaturedDocs()}
      projects={getDocsProjects()}
      siteTitle={siteData.siteTitle}
    >
      {children}
    </DocsShell>
  );
};

export default DocsLayout;
