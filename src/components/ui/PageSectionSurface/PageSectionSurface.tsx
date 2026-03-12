import { type ReactElement } from 'react';

import type { PageSectionSurfaceProps } from './PageSectionSurface.interfaces';
import st from './PageSectionSurface.module.css';

export const PageSectionSurface = ({
  children,
  className,
}: PageSectionSurfaceProps): ReactElement => {
  const rootClassName = className === undefined ? st.root : `${st.root} ${className}`;

  return (
    <div className={rootClassName}>
      <div aria-hidden="true" className={st.ambientRay} />
      {children}
    </div>
  );
};
