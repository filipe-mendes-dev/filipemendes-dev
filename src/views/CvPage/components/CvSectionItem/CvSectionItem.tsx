import type { ReactElement } from "react";

import type { CvSectionItemProps } from "./CvSectionItem.interfaces";
import st from "./CvSectionItem.module.css";

export const CvSectionItem = ({
  title,
  subtitle,
  date,
  children,
  hasBottomSeparator = false,
}: CvSectionItemProps): ReactElement => {
  const rootClassName = hasBottomSeparator
    ? `${st.root} ${st.withBottomSeparator}`
    : st.root;

  return (
    <li className={rootClassName}>
      {(subtitle !== undefined && subtitle.length > 0) ||
      (date !== undefined && date.length > 0) ? (
        <div className={st.header}>
          <div className={st.identity}>
            <h3 className={st.title}>{title}</h3>
            {subtitle !== undefined && subtitle.length > 0 && (
              <p className={st.subtitle}>{subtitle}</p>
            )}
          </div>
          {date !== undefined && date.length > 0 && (
            <p className={st.date}>{date}</p>
          )}
        </div>
      ) : (
        <h3 className={st.title}>{title}</h3>
      )}

      {children}
    </li>
  );
};
