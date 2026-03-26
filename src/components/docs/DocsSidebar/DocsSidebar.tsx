"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactElement, useId, useState } from "react";

import type { DocsSidebarProps } from "./DocsSidebar.interfaces";
import st from "./DocsSidebar.module.css";

const getDocHref = (docSlug: string): string => `/docs/${docSlug}`;

const getProjectHref = (projectSlug: string): string => {
  return `/docs/projects/${projectSlug}`;
};

const getCompactLabel = (title: string): string => {
  return title
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

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
  const currentYear = new Date().getFullYear();
  const toggleLabel = isExpanded
    ? "Collapse docs navigation"
    : "Expand docs navigation";
  const isHomeActive = pathname === "/docs";

  return (
    <aside
      className={`${st.root} ${
        isExpanded ? st.rootExpanded : st.rootCollapsed
      }`}
      aria-label="Documentation sidebar"
    >
      <div className={st.panel}>
        <div className={st.panelBody}>
          <div className={st.header}>
            <button
              type="button"
              className={st.siteMarkButton}
              aria-controls={docsNavId}
              aria-expanded={isExpanded}
              aria-label={toggleLabel}
              onClick={onToggleExpanded}
            >
              <span className={st.siteMarkPrompt} aria-hidden="true">
                {"</>"}
              </span>
              <div className={st.siteMarkTextContainer}>
                <span className={st.siteMarkText}>filipemendes.dev</span>
                <span className={st.eyebrow}>.Docs</span>
                <span className={st.siteMarkMiniText}>FM</span>
              </div>
            </button>
          </div>

          <div className={st.navScroller}>
            <nav
              id={docsNavId}
              aria-label="Documentation navigation"
              className={st.nav}
            >
              <ul className={st.navList}>
                <li>
                  <Link
                    href="/docs"
                    className={`${st.navLink} ${
                      isHomeActive ? st.navLinkActive : ""
                    }`}
                    aria-current={isHomeActive ? "page" : undefined}
                    onClick={onClose}
                  >
                    <span className={st.navCompactLabel}>H</span>
                    <span className={st.navLabel}>Home</span>
                  </Link>
                </li>
              </ul>

              <div className={st.navSection}>
                <button
                  type="button"
                  className={`${st.sectionToggle} ${
                    isProjectsOpen ? st.sectionToggleExpanded : ""
                  }`}
                  onClick={() => {
                    setIsProjectsOpen((currentValue) => !currentValue);
                  }}
                  aria-expanded={isProjectsOpen}
                >
                  <span className={st.sectionToggleLabel}>Projects</span>
                  <span
                    className={`${st.sectionToggleIcon} ${
                      isProjectsOpen ? st.sectionToggleIconExpanded : ""
                    }`}
                    aria-hidden="true"
                  >
                    ⌄
                  </span>
                </button>
                {isProjectsOpen && (
                  <ul className={st.navList}>
                    {projects.map((project) => {
                      const href = getProjectHref(project.slug);
                      const isActive =
                        pathname === href || pathname.startsWith(`${href}/`);

                      return (
                        <li key={project.slug}>
                          <Link
                            href={href}
                            className={`${st.navLink} ${
                              isActive ? st.navLinkActive : ""
                            }`}
                            aria-current={isActive ? "page" : undefined}
                            onClick={onClose}
                          >
                            <span className={st.navCompactLabel}>
                              {getCompactLabel(project.name)}
                            </span>
                            <span className={st.navLabel}>{project.name}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              <div className={st.navSection}>
                <button
                  type="button"
                  className={`${st.sectionToggle} ${
                    isFeaturedOpen ? st.sectionToggleExpanded : ""
                  }`}
                  onClick={() => {
                    setIsFeaturedOpen((currentValue) => !currentValue);
                  }}
                  aria-expanded={isFeaturedOpen}
                >
                  <span className={st.sectionToggleLabel}>Featured</span>
                  <span
                    className={`${st.sectionToggleIcon} ${
                      isFeaturedOpen ? st.sectionToggleIconExpanded : ""
                    }`}
                    aria-hidden="true"
                  >
                    ⌄
                  </span>
                </button>
                {isFeaturedOpen && (
                  <ul className={st.navList}>
                    {featuredDocs.map((document) => {
                      const href = getDocHref(document.slug);
                      const isActive = pathname === href;

                      return (
                        <li key={document.slug}>
                          <Link
                            href={href}
                            className={`${st.navLink} ${
                              isActive ? st.navLinkActive : ""
                            }`}
                            aria-current={isActive ? "page" : undefined}
                            onClick={onClose}
                          >
                            <span className={st.navCompactLabel}>
                              {getCompactLabel(document.title)}
                            </span>
                            <span className={st.navLabel}>
                              {document.title}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </nav>
          </div>

          <div className={st.footer}>
            <p className={st.footerTag}>[ Docs.system ]</p>
            {isExpanded && (
              <>
                <p className={st.footerName}>{siteTitle}</p>
                <p className={st.footerDescriptor}>{descriptor}</p>
                <p className={st.footerMeta}>
                  <span>Built with Next.js</span>
                  <span aria-hidden="true">•</span>
                  <span>© {currentYear}</span>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};
