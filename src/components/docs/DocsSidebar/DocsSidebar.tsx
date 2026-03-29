"use client";

import { type ReactElement, useState } from "react";

import { DocsSidebarHeader } from "./DocsSidebarHeader";
import type { DocsSidebarProps } from "./DocsSidebar.interfaces";
import { DocsSidebarContent } from "./DocsSidebarContent";
import st from "./DocsSidebar.module.css";

export const DocsSidebar = ({
  descriptor,
  featuredDocs,
  projects,
  siteTitle,
}: DocsSidebarProps): ReactElement => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleToggleMobileNavigation = (): void => {
    setIsMobileOpen((currentValue) => !currentValue);
  };

  const handleClose = (): void => {
    setIsMobileOpen(false);
  };

  return (
    <aside className={st.root} aria-label="Documentation sidebar">
      <DocsSidebarHeader
        isMobileOpen={isMobileOpen}
        onToggleMobileNavigation={handleToggleMobileNavigation}
      />

      <DocsSidebarContent
        descriptor={descriptor}
        featuredDocs={featuredDocs}
        isMobileOpen={isMobileOpen}
        onClose={handleClose}
        projects={projects}
        siteTitle={siteTitle}
      />
    </aside>
  );
};
