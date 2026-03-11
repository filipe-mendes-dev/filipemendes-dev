import type { CSSProperties, MouseEventHandler } from 'react';

import type { NavigationItem } from '../../../../data/portfolio';

export interface HeaderNavListProps {
  items: NavigationItem[];
  listClassName?: string;
  linkClassName: string;
  navigate: (href: string) => void;
  getItemKey: (item: NavigationItem) => string;
  isItemCurrent: (item: NavigationItem) => boolean;
  getItemOnClick: (item: NavigationItem) => MouseEventHandler<HTMLAnchorElement>;
  getItemStyle?: (index: number) => CSSProperties | undefined;
}
