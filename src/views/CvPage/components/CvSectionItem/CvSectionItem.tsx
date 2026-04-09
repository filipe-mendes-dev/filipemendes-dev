import type { ReactElement } from "react";

import type { CvSectionItemProps } from "./CvSectionItem.interfaces";
import st from "./CvSectionItem.module.css";

export const CvSectionItem = ({
  title,
  subtitle,
  date,
  href,
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
          {href !== undefined && href.length > 0 ? (
            <a className={st.headerMainLink} href={href}>
              <div className={st.headerMain}>
                <div className={st.identity}>
                  <h3 className={st.title}>{title}</h3>
                  {subtitle !== undefined && subtitle.length > 0 && (
                    <p className={st.subtitle}>{subtitle}</p>
                  )}
                </div>
              </div>
            </a>
          ) : (
            <div className={st.headerMain}>
              <div className={st.identity}>
                <h3 className={st.title}>{title}</h3>
                {subtitle !== undefined && subtitle.length > 0 && (
                  <p className={st.subtitle}>{subtitle}</p>
                )}
              </div>
            </div>
          )}
          {date !== undefined && date.length > 0 ? (
            <p className={st.date}>{date}</p>
          ) : null}
        </div>
      ) : (
        <h3 className={st.title}>{title}</h3>
      )}

      {children}
    </li>
  );
};
