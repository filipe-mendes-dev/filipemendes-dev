import type { HTMLAttributeAnchorTarget, MouseEventHandler, ReactNode } from 'react';

export interface AppLinkProps {
  href: string;
  navigate?: (href: string) => void;
  className?: string;
  children: ReactNode;
  ariaCurrent?: 'page';
  target?: HTMLAttributeAnchorTarget;
  rel?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}
