import type { ReactElement } from "react";

import { CvPageSection } from "../../CvPageSection";
import { CvSectionItem } from "../../CvSectionItem";
import type { CvEducationSectionProps } from "./CvEducationSection.interfaces";
import st from "./CvEducationSection.module.css";

export const CvEducationSection = ({
  entries,
}: CvEducationSectionProps): ReactElement => {
  return (
    <CvPageSection title="Education" hasBottomSeparator>
      <ul className={st.root}>
        {entries.map((entry) => (
          <CvSectionItem
            date={entry.timeframe}
            key={entry.title}
            subtitle={entry.institution}
            title={entry.title}
          >
            {entry.details !== undefined && (
              <p className={st.entryDetails}>{entry.details}</p>
            )}
          </CvSectionItem>
        ))}
      </ul>
    </CvPageSection>
  );
};
