import Link from 'next/link';
import type { ReactElement } from 'react';

import type { DocSummary } from '../../../data/docs/docs.interfaces';
import st from './DocsIndexView.module.css';

export interface DocsIndexViewProps {
  docs: DocSummary[];
  eyebrow: string;
  intro: string;
  title: string;
}

export const DocsIndexView = ({
  docs,
  eyebrow,
  intro,
  title,
}: DocsIndexViewProps): ReactElement => {
  return (
    <section className={st.root}>
      <header className={st.header}>
        <p className={st.eyebrow}>{eyebrow}</p>
        <h1 className={st.title}>{title}</h1>
        <p className={st.collectionLead}>{intro}</p>
      </header>

      <div className={st.documentGrid}>
        {docs.map((document) => (
          <Link
            key={document.slug}
            href={`/docs/${document.slug}`}
            className={st.documentCard}
          >
            <p className={st.cardEyebrow}>{document.projectName}</p>
            <h2 className={st.cardTitle}>{document.title}</h2>
            <p className={st.cardSummary}>{document.summary}</p>
            <span className={st.cardCta}>Open document</span>
          </Link>
        ))}
      </div>
    </section>
  );
};
