import type { ReactElement } from 'react';

import type { DocSummary } from '../../../data/docs/docs.interfaces';
import { DocsCard } from './components/DocsCard';
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
          <DocsCard key={document.slug} doc={document} />
        ))}
      </div>
    </section>
  );
};
