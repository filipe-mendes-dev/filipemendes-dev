import type { ReactElement } from 'react';

import { AboutSectionHeading } from '../AboutSectionHeading';
import type { AboutSupportSectionProps } from './AboutSupportSection.interfaces';
import st from './AboutSupportSection.module.css';

export const AboutSupportSection = ({
  children,
  className,
  icon,
  title,
}: AboutSupportSectionProps): ReactElement => {
  const rootClassName = className === undefined ? st.root : `${st.root} ${className}`;

  return (
    <section className={rootClassName}>
      <AboutSectionHeading title={title} icon={icon} />
      {children}
    </section>
  );
};
