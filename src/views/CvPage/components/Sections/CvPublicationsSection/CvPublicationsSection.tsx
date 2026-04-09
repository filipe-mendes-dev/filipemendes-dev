import type { ReactElement } from "react";

import { CvPageSection } from "../../CvPageSection";
import { CvSectionItem } from "../../CvSectionItem";
import type { CvPublicationsSectionProps } from "./CvPublicationsSection.interfaces";
import st from "./CvPublicationsSection.module.css";

export const CvPublicationsSection = ({
  entries,
  hasBottomSeparator = false,
}: CvPublicationsSectionProps): ReactElement => {
  return (
    <CvPageSection title="Publications" hasBottomSeparator={hasBottomSeparator}>
      <ul className={st.root}>
        {entries.map((entry) => (
          <CvSectionItem
            title={entry.title}
            titleClassName={st.itemTitle}
            subtitle={entry.venue}
            date={entry.year}
            href={entry.href}
            key={entry.title}
          />
        ))}
      </ul>
    </CvPageSection>
  );
};
