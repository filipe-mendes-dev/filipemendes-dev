import type { ReactElement } from 'react';

import type { SoftSurfaceProps } from './SoftSurface.interfaces';
import st from './SoftSurface.module.css';

export const SoftSurface = ({ children, className }: SoftSurfaceProps): ReactElement => {
  const rootClassName = className === undefined ? st.root : `${st.root} ${className}`;

  return <article className={rootClassName}>{children}</article>;
};
