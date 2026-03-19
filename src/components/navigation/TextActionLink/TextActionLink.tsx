import type { ReactElement } from 'react';

import { AppLink } from '../AppLink';
import type { TextActionLinkProps } from './TextActionLink.interfaces';
import st from './TextActionLink.module.css';

export const TextActionLink = ({
  href,
  children,
  className,
  target,
  rel,
  leadingIcon,
  trailingIcon,
}: TextActionLinkProps): ReactElement => {
  const rootClassName = className === undefined ? st.root : `${st.root} ${className}`;
  const linkProps = {
    href,
    className: rootClassName,
    ...(target !== undefined ? { target } : {}),
    ...(rel !== undefined ? { rel } : {}),
  };

  return (
    <AppLink {...linkProps}>
      {leadingIcon !== undefined && <span className={st.leadingIcon}>{leadingIcon}</span>}
      <span className={st.label}>{children}</span>
      {trailingIcon !== undefined && <span className={st.trailingIcon}>{trailingIcon}</span>}
    </AppLink>
  );
};
