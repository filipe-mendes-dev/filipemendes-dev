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
      <div aria-hidden="true" className={`${st.ambientGlow} ${st.ambientGlowA}`} />
      <div aria-hidden="true" className={`${st.ambientGlow} ${st.ambientGlowB}`} />
      <div aria-hidden="true" className={`${st.ambientGlow} ${st.ambientGlowC}`} />
      <div aria-hidden="true" className={st.ambientRay} />
      <div className={st.content}>{children}</div>
    </div>
  );
};
