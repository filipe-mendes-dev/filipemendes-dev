import type { ReactElement } from 'react';

import Link from 'next/link';
import type { HeaderNavListProps } from './HeaderNavList.interfaces';

export const HeaderNavList = ({
  items,
  listClassName,
  linkClassName,
}: HeaderNavListProps): ReactElement => {
  return (
    <ul className={listClassName}>
      {items.map((item) => {
        const linkAriaCurrent =
          item.isActive
            ? { 'aria-current': 'page' as const }
            : {};

        return (
          <li key={item.key} style={item.style}>
            <Link
              href={item.href}
              className={linkClassName}
              onClick={item.onClick}
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
