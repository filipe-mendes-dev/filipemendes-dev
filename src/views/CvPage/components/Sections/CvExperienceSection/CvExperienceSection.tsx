import type { ReactElement } from "react";

import { CvPageSection } from "../../CvPageSection";
import type { CvExperienceSectionProps } from "./CvExperienceSection.interfaces";
import st from "./CvExperienceSection.module.css";

export const CvExperienceSection = ({
  entries,
}: CvExperienceSectionProps): ReactElement => {
  return (
    <CvPageSection title="Experience">
      <ol className={st.root}>
        {entries.map((entry) => (
          <li className={st.entry} key={`${entry.company}-${entry.role}`}>
            <div className={st.entryHeader}>
              <div className={st.entryIdentity}>
                <h3 className={st.entryTitle}>{entry.role}</h3>
                <p className={st.entryCompany}>{entry.company}</p>
              </div>
              <p className={st.entryPeriod}>{entry.period}</p>
            </div>
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
          </li>
        ))}
      </ol>
    </CvPageSection>
  );
};
