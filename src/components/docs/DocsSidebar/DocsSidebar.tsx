"use client";

import { usePathname } from "next/navigation";
import { type ReactElement, useId, useState } from "react";

import { DocsSidebarFooter } from "./DocsSidebarFooter";
import { DocsSidebarHeader } from "./DocsSidebarHeader";
import type { DocsSidebarProps } from "./DocsSidebar.interfaces";
import { DocsSidebarAccordion } from "./DocsSidebarAccordion";
import { DocsSidebarNavItem } from "./DocsSidebarNavItem";
import st from "./DocsSidebar.module.css";

const getDocHref = (docSlug: string): string => `/docs/${docSlug}`;

const getProjectHref = (projectSlug: string): string =>
  `/docs/projects/${projectSlug}`;

export const DocsSidebar = ({
  descriptor,
  featuredDocs,
  isMobileOpen,
  onClose,
  onToggleMobileNavigation,
  projects,
  siteTitle,
}: DocsSidebarProps): ReactElement => {
  const pathname = usePathname() ?? "/docs";
  const docsNavId = useId();
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);
  const [isFeaturedOpen, setIsFeaturedOpen] = useState(true);
  const isHomeActive = pathname === "/docs";
  const projectItems = projects.map((project) => {
    const href = getProjectHref(project.slug);

    return {
      href,
      isActive: pathname === href || pathname.startsWith(`${href}/`),
      label: project.name,
    };
  });
  const featuredItems = featuredDocs.map((document) => {
    const href = getDocHref(document.slug);

    return {
      href,
      isActive: pathname === href,
      label: document.title,
    };
  });

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
        <div className={st.navScroller}>
          <nav
            id={docsNavId}
            aria-label="Documentation navigation"
            className={st.nav}
          >
            <ul className={st.navList}>
              <li>
                <DocsSidebarNavItem
                  compactLabel="H"
                  href="/docs"
                  isActive={isHomeActive}
                  label="Home"
                  onClick={onClose}
                />
              </li>
            </ul>

            <DocsSidebarAccordion
              isExpanded={isProjectsOpen}
              items={projectItems}
              label="Projects"
              onItemClick={onClose}
              onToggle={() => {
                setIsProjectsOpen((currentValue) => !currentValue);
              }}
            />

            <DocsSidebarAccordion
              isExpanded={isFeaturedOpen}
              items={featuredItems}
              label="Featured"
              onItemClick={onClose}
              onToggle={() => {
                setIsFeaturedOpen((currentValue) => !currentValue);
              }}
            />
          </nav>
        </div>
      </div>
      <DocsSidebarFooter descriptor={descriptor} siteTitle={siteTitle} />
    </aside>
  );
};
