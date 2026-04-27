import type { ReactElement } from "react";

import { CvBulletList } from "../../CvBulletList";
import { CvSectionItem } from "../../CvSectionItem";
import { CvPageSection } from "../../CvPageSection";
import type { CvExperienceSectionProps } from "./CvExperienceSection.interfaces";
import st from "./CvExperienceSection.module.css";

export const CvExperienceSection = ({
  entries,
  hasBottomSeparator = false,
}: CvExperienceSectionProps): ReactElement => {
  return (
    <CvPageSection title="Experience" hasBottomSeparator={hasBottomSeparator}>
      <ol className={st.root}>
        {entries.map((entry, index) => (
          <CvSectionItem
            inlineSubtitle
            date={entry.timeframe}
            hasBottomSeparator={index < entries.length - 1}
            key={`${entry.organization}-${entry.title}`}
            subtitle={entry.organization}
            title={entry.title}
          >
            <p className={st.entrySummary}>{entry.context}</p>
            {entry.bullets.length > 0 && <CvBulletList items={entry.bullets} />}
            {entry.stack.length > 0 && (
              <p className={st.stackLine}>Stack: {entry.stack.join(", ")}</p>
            )}
          </CvSectionItem>
        ))}
      </ol>
    </CvPageSection>
  );
};
