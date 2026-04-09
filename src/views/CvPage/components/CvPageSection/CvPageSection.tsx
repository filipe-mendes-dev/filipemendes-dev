import type { ReactElement } from "react";

import { CvPageSectionHeading } from "./components/CvPageSectionHeading";
import type { CvPageSectionProps } from "./CvPageSection.interfaces";
import st from "./CvPageSection.module.css";

export const CvPageSection = ({
  children,
  title,
  className,
  contentClassName,
  hasBottomSeparator = true,
}: CvPageSectionProps): ReactElement => {
  const baseRootClassName = hasBottomSeparator
    ? `${st.root} ${st.withBottomSeparator}`
    : st.root;
  const rootClassName =
    className === undefined
      ? baseRootClassName
      : `${baseRootClassName} ${className}`;
  const innerClassName =
    contentClassName === undefined
      ? st.content
      : `${st.content} ${contentClassName}`;

  return (
    <section className={rootClassName}>
      <CvPageSectionHeading title={title} />
      <div className={innerClassName}>{children}</div>
    </section>
  );
};
