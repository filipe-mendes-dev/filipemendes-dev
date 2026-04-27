import type { ReactElement } from "react";

import { CvLabeledList } from "../../CvLabeledList";
import { CvPageSection } from "../../CvPageSection";
import type { CvLanguagesSectionProps } from "./CvLanguagesSection.interfaces";

export const CvLanguagesSection = ({
  languages,
  hasBottomSeparator = false,
}: CvLanguagesSectionProps): ReactElement => {
  const entries = languages.map((language) => ({
    label: language.name,
    value: language.proficiency,
  }));

  return (
    <CvPageSection title="Languages" hasBottomSeparator={hasBottomSeparator}>
      <CvLabeledList entries={entries} />
    </CvPageSection>
  );
};
