import type { ReactElement } from "react";

import { CvLabeledList } from "../../CvLabeledList";
import { CvPageSection } from "../../CvPageSection";
import type { CvSkillsSectionProps } from "./CvSkillsSection.interfaces";

export const CvSkillsSection = ({
  skills,
  hasBottomSeparator = false,
}: CvSkillsSectionProps): ReactElement => {
  const entries = Object.entries(skills).map(([label, items]) => ({
    label,
    value: items.join(" · "),
  }));

  return (
    <CvPageSection title="Skills" hasBottomSeparator={hasBottomSeparator}>
      <CvLabeledList entries={entries} />
    </CvPageSection>
  );
};
