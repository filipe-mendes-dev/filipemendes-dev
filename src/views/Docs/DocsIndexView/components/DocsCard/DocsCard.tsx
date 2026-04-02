import Link from "next/link";
import type { ReactElement } from "react";

import { CalendarIcon } from "../../../../../components/icons";
import { ProjectLogoMark } from "../../../../../components/projects/ProjectLogoMark";
import type { DocsCardProps } from "./DocsCard.interfaces";
import st from "./DocsCard.module.css";

const getCardDateLabel = (lastUpdatedLabel?: string): string | undefined => {
  if (lastUpdatedLabel === undefined) {
    return undefined;
  }

  return lastUpdatedLabel.replace(/^Last updated\s*[·-]\s*/u, "");
};

export const DocsCard = ({ doc }: DocsCardProps): ReactElement => {
  const cardDateLabel = getCardDateLabel(doc.lastUpdatedLabel);

  return (
    <Link href={`/docs/${doc.slug}`} className={st.root}>
      <div className={st.topRow}>
        <p className={st.eyebrow}>
          {doc.logo !== undefined && (
            <span className={st.eyebrowLogo} aria-hidden="true">
              <ProjectLogoMark logo={doc.logo} />
            </span>
          )}
          <span>{doc.projectName ?? "Standalone document"}</span>
        </p>
        {cardDateLabel !== undefined && (
          <p className={st.metaLabel}>
            <CalendarIcon className={st.metaIcon} />
            <span>{cardDateLabel}</span>
          </p>
        )}
      </div>
      <h2 className={st.title}>{doc.title}</h2>
      <p className={st.summary}>{doc.summary}</p>
    </Link>
  );
};
