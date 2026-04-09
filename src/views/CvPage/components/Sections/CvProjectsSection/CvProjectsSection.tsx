import type { ReactElement } from "react";

import { CvPageSection } from "../../CvPageSection";
import { CvSectionItem } from "../../CvSectionItem";
import type { CvProjectsSectionProps } from "./CvProjectsSection.interfaces";
import st from "./CvProjectsSection.module.css";

export const CvProjectsSection = ({
  entries,
  hasBottomSeparator = false,
}: CvProjectsSectionProps): ReactElement => {
  return (
    <CvPageSection title="Projects" hasBottomSeparator={hasBottomSeparator}>
      <ul className={st.root}>
        {entries.map((entry, index) => (
          <CvSectionItem
            title={entry.title}
            subtitle={entry.type}
            href={entry.href}
            hasBottomSeparator={index < entries.length - 1}
            key={entry.title}
          >
            <p className={st.description}>{entry.context}</p>
            {entry.bullets.length > 0 && (
              <ul className={st.bulletList}>
                {entry.bullets.map((bullet) => (
                  <li className={st.bulletItem} key={bullet}>
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
            {entry.stack.length > 0 && (
              <p className={st.stackLine}>Stack: {entry.stack.join(", ")}</p>
            )}
          </CvSectionItem>
        ))}
      </ul>
    </CvPageSection>
  );
};
