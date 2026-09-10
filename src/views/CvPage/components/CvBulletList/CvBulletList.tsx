import type { ReactElement, ReactNode } from "react";

import type { CvBulletListProps } from "./CvBulletList.interfaces";
import st from "./CvBulletList.module.css";

const emphasizePhrases = (text: string, phrases: string[]): ReactNode[] => {
  const matches = phrases
    .map((phrase) => ({ phrase, start: text.indexOf(phrase) }))
    .filter((match) => match.start >= 0)
    .sort((left, right) => left.start - right.start);
  const content: ReactNode[] = [];
  let cursor = 0;

  for (const { phrase, start } of matches) {
    if (start < cursor) continue;
    content.push(text.slice(cursor, start));
    content.push(<strong key={start}>{phrase}</strong>);
    cursor = start + phrase.length;
  }

  content.push(text.slice(cursor));
  return content;
};

export const CvBulletList = ({
  items,
  highlights,
  className,
}: CvBulletListProps): ReactElement => {
  const rootClassName =
    className !== undefined && className.length > 0
      ? `${st.root} ${className}`
      : st.root;

  return (
    <ul className={rootClassName}>
      {items.map((item, index) => (
        <li className={st.item} key={item}>
          {emphasizePhrases(item, highlights?.[index] ?? [])}
        </li>
      ))}
    </ul>
  );
};
