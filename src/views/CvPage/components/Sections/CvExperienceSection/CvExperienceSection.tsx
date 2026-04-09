import type { ReactElement } from "react";

import { CvSectionItem } from "../../CvSectionItem";
import { CvPageSection } from "../../CvPageSection";
import type { CvExperienceSectionProps } from "./CvExperienceSection.interfaces";
import st from "./CvExperienceSection.module.css";

export const CvExperienceSection = ({
  entries,
}: CvExperienceSectionProps): ReactElement => {
  return (
    <CvPageSection title="Experience">
      <ol className={st.root}>
        {entries.map((entry, index) => (
          <CvSectionItem
            date={entry.period}
            hasBottomSeparator={index < entries.length - 1}
            key={`${entry.company}-${entry.role}`}
            subtitle={entry.company}
            title={entry.role}
          >
            <p className={st.entrySummary}>{entry.summary}</p>
            {entry.highlights !== undefined && entry.highlights.length > 0 && (
              <ul className={st.highlightList}>
                {entry.highlights.map((highlight) => (
                  <li className={st.highlightItem} key={highlight}>
                    {highlight}
                  </li>
                ))}
              </ul>
            )}
          </CvSectionItem>
        ))}
      </ol>
    </CvPageSection>
  );
};
