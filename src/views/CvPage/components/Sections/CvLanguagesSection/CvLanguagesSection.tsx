import type { ReactElement } from "react";

import { CvPageSection } from "../../CvPageSection";
import type { CvLanguagesSectionProps } from "./CvLanguagesSection.interfaces";
import st from "./CvLanguagesSection.module.css";

export const CvLanguagesSection = ({
  languages,
}: CvLanguagesSectionProps): ReactElement => {
  return (
    <CvPageSection title="Languages">
      <ul className={st.root}>
        {languages.map((entry) => (
          <li className={st.item} key={entry.name}>
            <span className={st.name}>{entry.name}</span>
            <span className={st.level}>{entry.proficiency}</span>
          </li>
        ))}
      </ul>
    </CvPageSection>
  );
};
