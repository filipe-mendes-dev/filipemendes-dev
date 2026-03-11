import type { ReactElement } from 'react';

import { AppLink } from '../../../navigation/AppLink';
import type { HeaderNavListProps } from './HeaderNavList.interfaces';

export const HeaderNavList = ({
  items,
  listClassName,
  linkClassName,
  navigate,
  getItemKey,
  isItemCurrent,
  getItemOnClick,
  getItemStyle,
}: HeaderNavListProps): ReactElement => {
  return (
    <ul className={listClassName}>
      {items.map((item, index) => {
        const linkAriaCurrent = isItemCurrent(item) ? { ariaCurrent: 'page' as const } : {};

        return (
          <li key={getItemKey(item)} style={getItemStyle?.(index)}>
            <AppLink
              href={item.href}
              navigate={navigate}
              className={linkClassName}
              onClick={getItemOnClick(item)}
              {...linkAriaCurrent}
            >
              {item.label}
            </AppLink>
          </li>
        );
      })}
    </ul>
  );
};
