import type { ReactElement } from "react";

import type { CvPaperProps } from "./CvPaper.interfaces";
import st from "./CvPaper.module.css";

export const CvPaper = ({ children }: CvPaperProps): ReactElement => {
  return (
    <div className={st.previewFrame}>
      <article className={st.root}>{children}</article>
    </div>
  );
};
