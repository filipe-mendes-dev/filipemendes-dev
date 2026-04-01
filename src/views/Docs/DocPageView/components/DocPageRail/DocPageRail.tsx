import Link from "next/link";
import type { ReactElement } from "react";

import type { DocPageRailProps } from "./DocPageRail.interfaces";
import { DocPageRailItem } from "./DocPageRailItem";
import st from "./DocPageRail.module.css";

export const DocPageRail = ({
  lastUpdatedLabel,
  projectName,
  projectSlug,
  sections,
}: DocPageRailProps): ReactElement => {
  const hasProjectContext =
    projectName !== undefined && projectSlug !== undefined;

  return (
    <aside className={st.root} aria-label="Document outline">
      <div className={st.inner}>
        <div className={st.section}>
          <p className={st.eyebrow}>On this page</p>
          <nav aria-label="Section navigation">
            <ul className={st.list}>
              {sections.map((section) => (
                <DocPageRailItem
                  key={section.id}
                  href={`#${section.id}`}
                  label={section.title}
                />
              ))}
            </ul>
          </nav>
        </div>

        <div className={st.section}>
          <p className={st.eyebrow}>Context</p>
          <div className={st.meta}>
            {hasProjectContext ? (
              <Link
                href={`/docs/projects/${projectSlug}`}
                className={st.projectLink}
              >
                {projectName}
              </Link>
            ) : (
              <p className={st.metaLabel}>Standalone document</p>
            )}
            {lastUpdatedLabel !== undefined && (
              <p className={st.metaLabel}>{lastUpdatedLabel}</p>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};
