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
            key={entry.title}
            subtitle={entry.details}
            title={entry.title}
          />
        ))}
      </ul>
    </CvPageSection>
  );
};
