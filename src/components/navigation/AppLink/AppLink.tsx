import type { MouseEvent, ReactElement } from 'react';

import type { AppLinkProps } from './AppLink.interfaces';

const isModifiedEvent = (event: MouseEvent<HTMLAnchorElement>): boolean => {
  return event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
};

export const AppLink = ({ href, navigate, className, children, ariaCurrent }: AppLinkProps): ReactElement => {
  const onClick = (event: MouseEvent<HTMLAnchorElement>): void => {
    if (isModifiedEvent(event) || event.button !== 0) {
      return;
    }

    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:')) {
      return;
    }

    event.preventDefault();
    navigate(href);
  };

  return (
    <a href={href} className={className} onClick={onClick} aria-current={ariaCurrent}>
      {children}
    </a>
  );
};
