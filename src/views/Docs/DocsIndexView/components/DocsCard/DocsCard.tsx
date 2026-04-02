import Link from "next/link";
import type { ReactElement } from "react";

import type { DocsCardProps } from "./DocsCard.interfaces";
import st from "./DocsCard.module.css";

export const DocsCard = ({ doc }: DocsCardProps): ReactElement => {
  return (
    <Link href={`/docs/${doc.slug}`} className={st.root}>
      <p className={st.eyebrow}>{doc.projectName ?? "Standalone document"}</p>
      <h2 className={st.title}>{doc.title}</h2>
      <p className={st.summary}>{doc.summary}</p>
      <span className={st.cta}>Open document</span>
    </Link>
  );
};
