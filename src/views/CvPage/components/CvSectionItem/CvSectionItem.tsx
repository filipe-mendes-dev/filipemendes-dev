import type { ReactElement } from "react";

import type { CvSectionItemProps } from "./CvSectionItem.interfaces";
import st from "./CvSectionItem.module.css";

export const CvSectionItem = ({
  title,
  titleClassName,
  subtitle,
  inlineSubtitle = false,
  date,
  href,
  children,
  hasBottomSeparator = false,
}: CvSectionItemProps): ReactElement => {
  const rootClassName = hasBottomSeparator
    ? `${st.root} ${st.withBottomSeparator}`
    : st.root;
  const resolvedTitleClassName =
    titleClassName !== undefined && titleClassName.length > 0
      ? `${st.title} ${titleClassName}`
      : st.title;

  const hasSubtitle = subtitle !== undefined && subtitle.length > 0;
  const hasDate = date !== undefined && date.length > 0;
  const hasHeader = hasSubtitle || hasDate;
  const hasHref = href !== undefined && href.length > 0;
  const isInline = inlineSubtitle && hasSubtitle;

  const titleHeading = (
    <h3 className={resolvedTitleClassName}>{title}</h3>
  );

  const identityClassName = isInline ? st.identityInline : st.identity;

  const identity = (
    <div className={st.headerMain}>
      <div className={identityClassName}>
        {titleHeading}
        {hasSubtitle && (
          <>
            {isInline && (
              <span aria-hidden="true" className={st.subtitleSeparator}>
                ·
              </span>
            )}
            <p className={st.subtitle}>{subtitle}</p>
          </>
        )}
      </div>
    </div>
  );

  return (
    <li className={rootClassName}>
      {hasHeader ? (
        <div className={st.header}>
          {hasHref ? (
            <a className={st.headerMainLink} href={href}>
              {identity}
            </a>
          ) : (
            identity
          )}
          {hasDate && <p className={st.date}>{date}</p>}
        </div>
      ) : (
        titleHeading
      )}

      {children}
    </li>
  );
};
