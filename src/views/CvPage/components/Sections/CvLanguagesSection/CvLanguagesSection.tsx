import type { ReactElement } from "react";

import { CvPageSection } from "../../CvPageSection";
import type { CvLanguagesSectionProps } from "./CvLanguagesSection.interfaces";
import st from "./CvLanguagesSection.module.css";

export const CvLanguagesSection = ({
  languages,
  hasBottomSeparator = false,
}: CvLanguagesSectionProps): ReactElement => {
  return (
    <CvPageSection title="Languages" className={st.root} hasBottomSeparator={hasBottomSeparator}>
      <ul className={st.list}>
        {languages.map((language) => (
          <li key={language.name}>
            <strong>{language.name}:</strong> {language.proficiency}
          </li>
        ))}
      </ul>
    </CvPageSection>
  );
};
