import type { HTMLAttributeAnchorTarget, MouseEventHandler, ReactNode } from 'react';

export interface AppLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
  ariaCurrent?: 'page';
  target?: HTMLAttributeAnchorTarget;
  rel?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}
