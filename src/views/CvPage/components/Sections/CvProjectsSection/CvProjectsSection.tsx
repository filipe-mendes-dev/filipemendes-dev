import type { ReactElement } from "react";

import { CvPageSection } from "../../CvPageSection";
import { CvSectionItem } from "../../CvSectionItem";
import type { CvProjectsSectionProps } from "./CvProjectsSection.interfaces";
import st from "./CvProjectsSection.module.css";

export const CvProjectsSection = ({
  entries,
}: CvProjectsSectionProps): ReactElement => {
  return (
    <CvPageSection title="Projects" hasBottomSeparator>
      <ul className={st.root}>
        {entries.map((entry, index) => (
          <CvSectionItem
            title={entry.name}
            subtitle={entry.category}
            href={entry.href}
            hasBottomSeparator={index < entries.length - 1}
            key={entry.name}
          >
            <p className={st.description}>{entry.description}</p>
          </CvSectionItem>
        ))}
      </ul>
    </CvPageSection>
  );
};
