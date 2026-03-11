import type { ReactElement } from 'react';

import type { RevealItemProps, RevealItemStyle } from './RevealItem.interfaces';
import st from './RevealItem.module.css';

export const RevealItem = ({ children, className, index = 0, role = 'default' }: RevealItemProps): ReactElement => {
  const rootClassName = className === undefined ? st.root : `${st.root} ${className}`;
  const style: RevealItemStyle = {
    '--reveal-index': index,
  };

  return (
    <div className={rootClassName} data-reveal-item="" data-reveal-role={role} style={style}>
      {children}
    </div>
  );
};
