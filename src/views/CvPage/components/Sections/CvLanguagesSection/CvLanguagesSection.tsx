import type { ReactElement } from "react";

import { DocumentIcon } from "../../../../../components/icons";
import { CvPageSection } from "../../CvPageSection";
import type { CvLanguagesSectionProps } from "./CvLanguagesSection.interfaces";
import st from "./CvLanguagesSection.module.css";

export const CvLanguagesSection = ({
  languages,
}: CvLanguagesSectionProps): ReactElement => {
  return (
    <CvPageSection icon={DocumentIcon} title="Languages">
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
