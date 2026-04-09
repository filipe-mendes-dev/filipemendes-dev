import type { ReactElement } from "react";

import { CvSectionItem } from "../../CvSectionItem";
import { CvPageSection } from "../../CvPageSection";
import type { CvExperienceSectionProps } from "./CvExperienceSection.interfaces";
import st from "./CvExperienceSection.module.css";

export const CvExperienceSection = ({
  entries,
}: CvExperienceSectionProps): ReactElement => {
  return (
    <CvPageSection title="Experience" hasBottomSeparator>
      <ol className={st.root}>
        {entries.map((entry, index) => (
          <CvSectionItem
            date={entry.timeframe}
            hasBottomSeparator={index < entries.length - 1}
            key={`${entry.organization}-${entry.title}`}
            subtitle={entry.organization}
            title={entry.title}
          >
            <p className={st.entrySummary}>{entry.context}</p>
            {entry.bullets.length > 0 && (
              <ul className={st.highlightList}>
                {entry.bullets.map((bullet) => (
                  <li className={st.highlightItem} key={bullet}>
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
      </ol>
    </CvPageSection>
  );
};
