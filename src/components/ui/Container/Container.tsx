import type { ReactElement } from 'react';

import type { ContainerProps } from './Container.interfaces';
import st from './Container.module.css';

export const Container = ({ children, className }: ContainerProps): ReactElement => {
  const classes = className === undefined ? st.root : `${st.root} ${className}`;

  return <div className={classes}>{children}</div>;
};
