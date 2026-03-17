'use client';

import type { MouseEvent, ReactElement } from 'react';

import type { AppLinkProps } from './AppLink.interfaces';

const isModifiedEvent = (event: MouseEvent<HTMLAnchorElement>): boolean => {
  return event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
};

const isExternalHref = (href: string): boolean => {
  return href.startsWith('//') || /^[a-z][a-z\d+\-.]*:/i.test(href);
};

const shouldUseBrowserNavigation = (href: string, target: AppLinkProps['target']): boolean => {
  if (target !== undefined && target !== '_self') {
    return true;
  }

  return isExternalHref(href);
};

export const AppLink = ({ href, navigate, className, children, ariaCurrent, target, rel, onClick: onAnchorClick }: AppLinkProps): ReactElement => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>): void => {
    onAnchorClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (isModifiedEvent(event) || event.button !== 0) {
      return;
    }

    if (shouldUseBrowserNavigation(href, target) || navigate === undefined) {
      return;
    }

    event.preventDefault();
    navigate(href);
  };

  return (
    <a href={href} className={className} onClick={handleClick} aria-current={ariaCurrent} target={target} rel={rel}>
      {children}
    </a>
  );
};
