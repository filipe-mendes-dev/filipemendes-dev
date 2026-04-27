import type { ReactElement } from "react";

import type { CvLabeledListProps } from "./CvLabeledList.interfaces";
import st from "./CvLabeledList.module.css";

export const CvLabeledList = ({
  entries,
}: CvLabeledListProps): ReactElement => {
  return (
    <ul className={st.root}>
      {entries.map((entry) => (
        <li className={st.item} key={entry.label}>
          <span className={st.label}>{entry.label}</span>
          <span className={st.value}>{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};
