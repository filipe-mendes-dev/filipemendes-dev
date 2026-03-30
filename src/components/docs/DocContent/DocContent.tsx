import type { ReactElement } from 'react';

import type {
  DocContentBlock,
  DocListBlock,
} from '../../../data/docs/docs.interfaces';
import type { DocContentProps } from './DocContent.interfaces';
import st from './DocContent.module.css';

const renderList = (
  block: DocListBlock,
  sectionId: string,
  blockIndex: number,
): ReactElement => {
  const ListTag = block.ordered ? 'ol' : 'ul';

  return (
    <ListTag className={st.list} key={`${sectionId}:${blockIndex}`}>
      {block.items.map((item) => (
        <li key={item} className={st.listItem}>
          {item}
        </li>
      ))}
    </ListTag>
  );
};

const renderBlock = (
  block: DocContentBlock,
  sectionId: string,
  blockIndex: number,
): ReactElement => {
  if (block.kind === 'paragraph') {
    return (
      <p className={st.paragraph} key={`${sectionId}:${blockIndex}`}>
        {block.text}
      </p>
    );
  }

  return renderList(block, sectionId, blockIndex);
};

export const DocContent = ({
  doc,
}: DocContentProps): ReactElement => {
  return (
    <article className={st.root}>
      {doc.sections.map((section) => (
        <section key={section.id} id={section.id} className={st.section}>
          <div className={st.sectionHeader}>
            <p className={st.sectionEyebrow}>{section.id}</p>
            <h2 className={st.sectionTitle}>{section.title}</h2>
          </div>
          <div className={st.sectionBody}>
            {section.content.map((block, blockIndex) =>
              renderBlock(block, section.id, blockIndex),
            )}
          </div>
        </section>
      ))}
    </article>
  );
};
