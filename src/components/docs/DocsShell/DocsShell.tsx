"use client";

import { type ReactElement, useEffect, useState } from "react";

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
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleToggleExpanded = (): void => {
    setIsMobileOpen((currentValue) => !currentValue);
  };

  const handleClose = (): void => {
    setIsMobileOpen(false);
  };

  return (
    <div
      className={st.root}
      data-mobile-state={isMobileOpen ? "open" : "closed"}
    >
      <DocsSidebar
        descriptor={descriptor}
        featuredDocs={featuredDocs}
        isMobileOpen={isMobileOpen}
        onClose={handleClose}
        onToggleMobileNavigation={handleToggleExpanded}
        projects={projects}
        siteTitle={siteTitle}
      />
      <button
        type="button"
        className={st.backdrop}
        data-state={isMobileOpen ? "open" : "closed"}
        aria-label="Close docs navigation"
        onClick={handleClose}
      />
      <main className={st.content}>
        <div className={st.contentInner}>{children}</div>
      </main>
    </div>
  );
};
