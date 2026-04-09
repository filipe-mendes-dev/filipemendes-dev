import type { ReactElement } from "react";

import { CvPageSection } from "../../CvPageSection";
import { CvSectionItem } from "../../CvSectionItem";
import type { CvPublicationsSectionProps } from "./CvPublicationsSection.interfaces";
import st from "./CvPublicationsSection.module.css";

export const CvPublicationsSection = ({
  entries,
}: CvPublicationsSectionProps): ReactElement => {
  return (
    <CvPageSection title="Publications">
      <ul className={st.root}>
        {entries.map((entry, index) => (
          <CvSectionItem
            title={entry.title}
            titleClassName={st.itemTitle}
            subtitle={entry.venue}
            date={entry.year}
            href={entry.href}
            hasBottomSeparator={index < entries.length - 1}
            key={entry.title}
          />
        ))}
      </ul>
    </CvPageSection>
  );
};
