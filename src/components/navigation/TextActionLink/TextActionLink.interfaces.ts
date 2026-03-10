import type { HTMLAttributeAnchorTarget, ReactNode } from 'react';

export interface TextActionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  navigate?: (href: string) => void;
  target?: HTMLAttributeAnchorTarget;
  rel?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}
