import Link from "next/link";
import type { ReactElement } from "react";

import { DocContent } from "../../../components/docs/DocContent";
import type { Doc } from "../../../data/docs/docs.interfaces";
import st from "./DocPageView.module.css";

export interface DocPageViewProps {
  doc: Doc;
}

export const DocPageView = ({
  doc,
}: DocPageViewProps): ReactElement => {
  return (
    <div className={st.root}>
      <nav aria-label="Breadcrumb" className={st.breadcrumbs}>
        <Link href="/docs" className={st.breadcrumbLink}>
          Home
        </Link>
        <span className={st.breadcrumbDivider}>/</span>
        <Link
          href={`/docs/projects/${doc.projectSlug}`}
          className={st.breadcrumbLink}
        >
          {doc.projectName}
        </Link>
        <span className={st.breadcrumbDivider}>/</span>
        <span className={st.breadcrumbCurrent}>{doc.title}</span>
      </nav>

      <header className={st.header}>
        <p className={st.eyebrow}>{doc.projectName}</p>
        <h1 className={st.title}>{doc.title}</h1>
        <p className={st.summary}>{doc.summary}</p>
        {doc.lastUpdatedLabel !== undefined && (
          <p className={st.metaLabel}>{doc.lastUpdatedLabel}</p>
        )}
      </header>

      <DocContent doc={doc} />
    </div>
  );
};
