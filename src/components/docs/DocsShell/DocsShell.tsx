import type { ReactElement } from "react";

import { LayoutContainer } from "../../layout/LayoutContainer";
import { DocsSidebar } from "../DocsSidebar";
import type { DocsShellProps } from "./DocsShell.interfaces";
import st from "./DocsShell.module.css";

export const DocsShell = ({
  children,
  descriptor,
  featuredDocs,
  projects,
  siteTitle,
}: DocsShellProps): ReactElement => {
  return (
    <div className={st.root}>
      <DocsSidebar
        descriptor={descriptor}
        featuredDocs={featuredDocs}
        projects={projects}
        siteTitle={siteTitle}
      />
      <LayoutContainer as="main" className={st.content}>
        <div className={st.contentInner}>{children}</div>
      </LayoutContainer>
    </div>
  );
};
