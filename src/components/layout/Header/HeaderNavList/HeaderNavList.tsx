import type { ReactElement } from 'react';

import Link from 'next/link';
import type { HeaderNavListProps } from './HeaderNavList.interfaces';

export const HeaderNavList = ({
  items,
  listClassName,
  linkClassName,
  getItemKey,
  getItemHref,
  isItemCurrent,
  getItemOnClick,
  getItemStyle,
}: HeaderNavListProps): ReactElement => {
  return (
    <ul className={listClassName}>
      {items.map((item, index) => {
        const linkAriaCurrent =
          isItemCurrent(item)
            ? { 'aria-current': 'page' as const }
            : {};

        return (
          <li key={getItemKey(item)} style={getItemStyle?.(index)}>
            <Link
              href={getItemHref(item)}
              className={linkClassName}
              onClick={getItemOnClick(item)}
              {...linkAriaCurrent}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
