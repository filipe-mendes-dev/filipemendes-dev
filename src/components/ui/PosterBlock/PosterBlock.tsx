import type { ReactElement } from 'react';

import type { PosterBlockProps } from './PosterBlock.interfaces';
import st from './PosterBlock.module.css';

export const PosterBlock = ({ children, className }: PosterBlockProps): ReactElement => {
  const classes = className === undefined ? st.root : `${st.root} ${className}`;

  return <article className={classes}>{children}</article>;
};
