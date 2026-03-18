import type { ReactElement } from 'react';

import type { AboutSectionHeadingProps } from './AboutSectionHeading.interfaces';
import st from './AboutSectionHeading.module.css';

export const AboutSectionHeading = ({
  title,
  icon: Icon,
  variant = 'secondary',
}: AboutSectionHeadingProps): ReactElement => {
  const variantClassName = variant === 'primary' ? st.primary : st.secondary;

  return (
    <h3 className={`${st.root} ${variantClassName}`}>
      <Icon className={st.icon} />
      {title}
    </h3>
  );
};
