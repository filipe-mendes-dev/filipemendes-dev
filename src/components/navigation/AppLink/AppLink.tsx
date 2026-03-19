'use client';

import type { ReactElement } from 'react';

import type { AppLinkProps } from './AppLink.interfaces';

export const AppLink = ({
  href,
  className,
  children,
  ariaCurrent,
  target,
  rel,
  onClick,
}: AppLinkProps): ReactElement => {
  return (
    <a href={href} className={className} onClick={onClick} aria-current={ariaCurrent} target={target} rel={rel}>
      {children}
    </a>
  );
};
