import type { ReactElement } from "react";

import type { CvStackLineProps } from "./CvStackLine.interfaces";
import st from "./CvStackLine.module.css";

export const CvStackLine = ({ items }: CvStackLineProps): ReactElement => {
  return (
    <p className={st.root}>
      <span className={st.label}>Stack: </span>
      <span className={st.items}>{items.join(" · ")}</span>
    </p>
  );
};
