import type { ReactElement } from "react";

import type { CvPageSectionHeadingProps } from "./CvPageSectionHeading.interfaces";
import st from "./CvPageSectionHeading.module.css";

export const CvPageSectionHeading = ({
  title,
}: CvPageSectionHeadingProps): ReactElement => {
  return (
    <h2 className={st.root}>
      <span className={st.titleText}>{title}</span>
      <span aria-hidden="true" className={st.accent} />
    </h2>
  );
};
