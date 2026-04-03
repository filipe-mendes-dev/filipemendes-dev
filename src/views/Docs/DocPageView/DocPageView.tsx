import Link from "next/link";
import type { ReactElement } from "react";

import { DocContent } from "../../../components/docs/DocContent";
import { ProjectLogoMark } from "../../../components/projects/ProjectLogoMark";
import type { Doc } from "../../../data/docs/docs.interfaces";
import { DocPageRail } from "./components/DocPageRail";
import st from "./DocPageView.module.css";

export interface DocPageViewProps {
  doc: Doc;
}

export const DocPageView = ({
  doc,
}: DocPageViewProps): ReactElement => {
  const hasProjectContext =
    doc.projectName !== undefined && doc.projectSlug !== undefined;
  const eyebrow = doc.projectName ?? "Standalone document";

  return (
    <div className={st.root}>
      <nav aria-label="Breadcrumb" className={st.breadcrumbs}>
        <Link href="/docs" className={st.breadcrumbLink}>
          Home
        </Link>
        {hasProjectContext && (
          <>
            <span className={st.breadcrumbDivider}>/</span>
            <Link
              href={`/docs/projects/${doc.projectSlug}`}
              className={st.breadcrumbLink}
            >
              {doc.logo !== undefined && (
                <span className={st.breadcrumbLogo} aria-hidden="true">
                  <ProjectLogoMark logo={doc.logo} />
                </span>
              )}
              {doc.projectName}
            </Link>
          </>
        )}
        <span className={st.breadcrumbDivider}>/</span>
        <span className={st.breadcrumbCurrent}>{doc.title}</span>
      </nav>

      <div className={st.layout}>
        <div className={st.mainColumn}>
          <header className={st.header}>
            <p className={st.eyebrow}>
              {doc.logo !== undefined && (
                <span className={st.eyebrowLogo} aria-hidden="true">
                  <ProjectLogoMark logo={doc.logo} />
                </span>
              )}
              <span>{eyebrow}</span>
            </p>
            <h1 className={st.title}>{doc.title}</h1>
            <p className={st.summary}>{doc.summary}</p>
            {doc.lastUpdatedLabel !== undefined && (
              <p className={st.metaLabel}>{doc.lastUpdatedLabel}</p>
            )}
          </header>

          <DocContent doc={doc} />
        </div>

        <DocPageRail
          lastUpdatedLabel={doc.lastUpdatedLabel}
          logo={doc.logo}
          projectName={doc.projectName}
          projectSlug={doc.projectSlug}
          sections={doc.sections}
        />
      </div>
    </div>
  );
};
