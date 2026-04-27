import type { ReactElement } from "react";

import type { CvStackLineProps } from "./CvStackLine.interfaces";
import st from "./CvStackLine.module.css";

export const CvStackLine = ({ items }: CvStackLineProps): ReactElement => {
  return <p className={st.root}>Stack: {items.join(" · ")}</p>;
};
