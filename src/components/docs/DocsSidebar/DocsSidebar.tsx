"use client";

import { usePathname } from "next/navigation";
import { type ReactElement, useId, useState } from "react";

import { DocsSidebarFooter } from "./DocsSidebarFooter";
import { DocsSidebarHeader } from "./DocsSidebarHeader";
import type { DocsSidebarProps } from "./DocsSidebar.interfaces";
import { DocsSidebarNavItem } from "./DocsSidebarNavItem";
import { DocsSidebarSectionToggle } from "./DocsSidebarSectionToggle";
import st from "./DocsSidebar.module.css";

const getDocHref = (docSlug: string): string => `/docs/${docSlug}`;

const getProjectHref = (projectSlug: string): string =>
  `/docs/projects/${projectSlug}`;

export const DocsSidebar = ({
  descriptor,
  featuredDocs,
  isExpanded,
  onClose,
  onToggleExpanded,
  projects,
  siteTitle,
}: DocsSidebarProps): ReactElement => {
  const pathname = usePathname() ?? "/docs";
  const docsNavId = useId();
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);
  const [isFeaturedOpen, setIsFeaturedOpen] = useState(true);
  const isHomeActive = pathname === "/docs";

  return (
    <aside
      className={`${st.root} ${
        isExpanded ? st.rootExpanded : st.rootCollapsed
      }`}
      aria-label="Documentation sidebar"
    >
      <DocsSidebarHeader
        docsNavId={docsNavId}
        isExpanded={isExpanded}
        onToggleExpanded={onToggleExpanded}
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
                  isExpanded={isExpanded}
                  label="Home"
                  onClick={onClose}
                />
              </li>
            </ul>

            <div className={st.navSection}>
              <DocsSidebarSectionToggle
                isExpanded={isProjectsOpen}
                isSidebarExpanded={isExpanded}
                label="Projects"
                onToggle={() => {
                  setIsProjectsOpen((currentValue) => !currentValue);
                }}
              />
              {isProjectsOpen && (
                <ul className={st.navList}>
                  {projects.map((project) => {
                    const href = getProjectHref(project.slug);
                    const isActive =
                      pathname === href || pathname.startsWith(`${href}/`);

                    return (
                      <li key={project.slug}>
                        <DocsSidebarNavItem
                          href={href}
                          isActive={isActive}
                          isExpanded={isExpanded}
                          isNested
                          label={project.name}
                          onClick={onClose}
                        />
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className={st.navSection}>
              <DocsSidebarSectionToggle
                isExpanded={isFeaturedOpen}
                isSidebarExpanded={isExpanded}
                label="Featured"
                onToggle={() => {
                  setIsFeaturedOpen((currentValue) => !currentValue);
                }}
              />
              {isFeaturedOpen && (
                <ul className={st.navList}>
                  {featuredDocs.map((document) => {
                    const href = getDocHref(document.slug);
                    const isActive = pathname === href;

                    return (
                      <li key={document.slug}>
                        <DocsSidebarNavItem
                          href={href}
                          isActive={isActive}
                          isExpanded={isExpanded}
                          isNested
                          label={document.title}
                          onClick={onClose}
                        />
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </nav>
        </div>
      </div>
      <DocsSidebarFooter
        descriptor={descriptor}
        isExpanded={isExpanded}
        siteTitle={siteTitle}
      />
    </aside>
  );
};
