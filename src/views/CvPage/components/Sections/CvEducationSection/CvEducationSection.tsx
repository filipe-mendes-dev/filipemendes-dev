import type { ReactElement } from "react";

import { CvPageSection } from "../../CvPageSection";
import { CvSectionItem } from "../../CvSectionItem";
import type { CvEducationSectionProps } from "./CvEducationSection.interfaces";
import st from "./CvEducationSection.module.css";

export const CvEducationSection = ({
  entries,
  hasBottomSeparator = false,
}: CvEducationSectionProps): ReactElement => {
  return (
    <CvPageSection title="Education" hasBottomSeparator={hasBottomSeparator}>
      <ul className={st.root}>
        {entries.map((entry) => (
          <CvSectionItem
            date={entry.period}
            inlineSubtitle
            key={entry.title}
            subtitle={entry.details}
            title={entry.title}
          >
            {entry.context !== undefined && (
              <p className={st.context}>{entry.context}</p>
            )}
          </CvSectionItem>
        ))}
      </ul>
    </CvPageSection>
  );
};
