import type { ReactElement } from "react";

import { CvPageSectionHeading } from "./components/CvPageSectionHeading";
import type { CvPageSectionProps } from "./CvPageSection.interfaces";
import st from "./CvPageSection.module.css";

export const CvPageSection = ({
  children,
  title,
  icon,
  className,
  contentClassName,
}: CvPageSectionProps): ReactElement => {
  const rootClassName =
    className === undefined ? st.root : `${st.root} ${className}`;
  const innerClassName =
    contentClassName === undefined
      ? st.content
      : `${st.content} ${contentClassName}`;

  return (
    <section className={rootClassName}>
      <CvPageSectionHeading icon={icon} title={title} />
      <div className={innerClassName}>{children}</div>
    </section>
  );
};
