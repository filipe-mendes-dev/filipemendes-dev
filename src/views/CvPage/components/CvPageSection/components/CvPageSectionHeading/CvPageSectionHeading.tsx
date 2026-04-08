import type { ReactElement } from "react";

import type { CvPageSectionHeadingProps } from "./CvPageSectionHeading.interfaces";
import st from "./CvPageSectionHeading.module.css";

export const CvPageSectionHeading = ({
  title,
  icon: Icon,
}: CvPageSectionHeadingProps): ReactElement => {
  return (
    <h2 className={st.root}>
      <Icon className={st.icon} />
      <span>{title}</span>
    </h2>
  );
};
