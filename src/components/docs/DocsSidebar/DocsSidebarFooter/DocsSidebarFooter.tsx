"use client";

import type { ReactElement } from "react";

import { ThemeToggle } from "../../../layout/Header/ThemeToggle";
import type { DocsSidebarFooterProps } from "./DocsSidebarFooter.interfaces";
import st from "./DocsSidebarFooter.module.css";

export const DocsSidebarFooter = ({
  descriptor,
  siteTitle,
}: DocsSidebarFooterProps): ReactElement => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={st.root} data-sidebar-footer="true">
      <ThemeToggle className={st.themeToggle} size="compact" />

      <p className={st.tag}>[ Docs.system ]</p>
      <p className={st.name}>{siteTitle}</p>
      <p className={st.descriptor}>{descriptor}</p>
      <p className={st.meta}>
        <span>Built with Next.js</span>
        <span aria-hidden="true">•</span>
        <span>© {currentYear}</span>
      </p>
    </div>
  );
};
