import type { ReactElement } from "react";

import { EducationIcon } from "../../../../../components/icons";
import { CvPageSection } from "../../CvPageSection";
import type { CvEducationSectionProps } from "./CvEducationSection.interfaces";
import st from "./CvEducationSection.module.css";

export const CvEducationSection = ({
  entries,
}: CvEducationSectionProps): ReactElement => {
  return (
    <CvPageSection icon={EducationIcon} title="Education">
      <ul className={st.root}>
        {entries.map((entry) => (
          <li className={st.entry} key={entry.title}>
            <div className={st.entryHeader}>
              <div className={st.entryIdentity}>
                <h3 className={st.entryTitle}>{entry.title}</h3>
                <p className={st.entryCompany}>{entry.institution}</p>
              </div>
              <p className={st.entryPeriod}>{entry.period}</p>
            </div>
            {entry.details !== undefined && (
              <p className={st.entryDetails}>{entry.details}</p>
            )}
          </li>
        ))}
      </ul>
    </CvPageSection>
  );
};
