"use client";

import { type ReactElement, useId } from "react";

import { DocsSidebarHeader } from "./DocsSidebarHeader";
import type { DocsSidebarProps } from "./DocsSidebar.interfaces";
import { DocsSidebarContent } from "./DocsSidebarContent";
import st from "./DocsSidebar.module.css";

export const DocsSidebar = ({
  descriptor,
  featuredDocs,
  isMobileOpen,
  onClose,
  onToggleMobileNavigation,
  projects,
  siteTitle,
}: DocsSidebarProps): ReactElement => {
  const docsNavId = useId();

  return (
    <aside
      className={st.root}
      aria-label="Documentation sidebar"
      data-mobile-state={isMobileOpen ? "open" : "closed"}
    >
      <DocsSidebarHeader
        docsNavId={docsNavId}
        isMobileOpen={isMobileOpen}
        onToggleMobileNavigation={onToggleMobileNavigation}
      />
      <div className={st.body}>
        <DocsSidebarContent
          descriptor={descriptor}
          featuredDocs={featuredDocs}
          isMobileOpen={isMobileOpen}
          onClose={onClose}
          projects={projects}
          siteTitle={siteTitle}
        />
      </div>
    </aside>
  );
};
