import type { ReactElement } from "react";

import type { CvPageHeaderProps } from "./CvPageHeader.interfaces";
import st from "./CvPageHeader.module.css";

export const CvPageHeader = ({
  personalInfo,
}: CvPageHeaderProps): ReactElement => {
  return (
    <header className={st.root}>
      <div className={st.identity}>
        <h1 className={st.name}>{personalInfo.name}</h1>
        <p className={st.title}>{personalInfo.title}</p>
        {personalInfo.summary !== undefined && personalInfo.summary.length > 0 && (
          <p className={st.summary}>{personalInfo.summary}</p>
        )}
      </div>

      <div className={st.identityMeta}>
        <p className={st.location}>{personalInfo.location}</p>
        {personalInfo.availability !== undefined && (
          <p className={st.availability}>{personalInfo.availability}</p>
        )}
      </div>
    </header>
  );
};
