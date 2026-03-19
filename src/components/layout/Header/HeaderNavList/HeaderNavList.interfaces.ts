import type { CSSProperties, MouseEventHandler } from 'react';

export interface HeaderNavListItem {
  href: string;
  isActive: boolean;
  key: string;
  label: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  style?: CSSProperties;
}

export interface HeaderNavListProps {
  items: HeaderNavListItem[];
  listClassName?: string;
  linkClassName: string;
}
