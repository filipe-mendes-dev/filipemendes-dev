import type { ReactElement } from "react";

import type { DocsSidebarFooterProps } from "./DocsSidebarFooter.interfaces";
import st from "./DocsSidebarFooter.module.css";

export const DocsSidebarFooter = ({
  descriptor,
  isExpanded,
  siteTitle,
}: DocsSidebarFooterProps): ReactElement => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={`${st.root} ${isExpanded ? st.rootExpanded : st.rootCollapsed}`}>
      <p className={st.tag}>[ Docs.system ]</p>
      {isExpanded && (
        <>
          <p className={st.name}>{siteTitle}</p>
          <p className={st.descriptor}>{descriptor}</p>
          <p className={st.meta}>
            <span>Built with Next.js</span>
            <span aria-hidden="true">•</span>
            <span>© {currentYear}</span>
          </p>
        </>
      )}
    </div>
  );
};
