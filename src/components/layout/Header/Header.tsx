import { type ReactElement, useEffect, useMemo, useRef } from 'react';

import { AppLink } from '../../navigation/AppLink';
import { Container } from '../../ui/Container';
import { getSectionFromHref } from '../../../shared/navigation/sections';
import type { HeaderProps } from './Header.interfaces';
import st from './Header.module.css';

export const Header = ({
  siteTitle,
  navigation,
  pathname,
  currentHref,
  activeSection,
  navigate,
  theme,
  onThemeToggle,
}: HeaderProps): ReactElement => {
  const headerRef = useRef<HTMLElement>(null);
  const homeLinkAriaCurrent = pathname === '/' && activeSection === 'home' ? { ariaCurrent: 'page' as const } : {};
  const nextThemeLabel = theme === 'light' ? 'dark' : 'light';

  useEffect(() => {
    if (headerRef.current === null) {
      return;
    }

    const root = document.documentElement;
    const syncHeaderOffset = (): void => {
      if (headerRef.current === null) {
        return;
      }

      root.style.setProperty('--header-offset', `${headerRef.current.offsetHeight}px`);
    };

    syncHeaderOffset();

    const observer = new ResizeObserver(() => {
      syncHeaderOffset();
    });

    observer.observe(headerRef.current);
    window.addEventListener('resize', syncHeaderOffset);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', syncHeaderOffset);
    };
  }, []);

  const linkStatusMap = useMemo(() => {
    return navigation.reduce<Record<string, boolean>>((accumulator, item) => {
      const sectionFromHref = getSectionFromHref(item.href);
      const isCurrentSection = sectionFromHref !== undefined && activeSection === sectionFromHref;
      const isCurrentPath = currentHref === item.href || pathname.startsWith(`${item.href}/`);

      accumulator[item.href] = isCurrentSection || isCurrentPath;

      return accumulator;
    }, {});
  }, [activeSection, currentHref, navigation, pathname]);

  return (
    <header ref={headerRef} className={`${st.root} ${st.siteHeader}`}>
      <Container className={st.headerInner}>
        <AppLink href="/" navigate={navigate} className={st.siteMark} {...homeLinkAriaCurrent}>
          <span className={st.siteMarkPrompt} aria-hidden="true">
            {'</>'}
          </span>
          <span className={st.siteMarkText}>filipemendes.dev</span>
          <span className={st.siteMarkSrOnly}>{siteTitle}</span>
        </AppLink>
        <nav aria-label="Primary">
          <ul className={st.siteNavList}>
            {navigation.map((item) => {
              const isCurrent = linkStatusMap[item.href];
              const linkAriaCurrent = isCurrent ? { ariaCurrent: 'page' as const } : {};

              return (
                <li key={item.href}>
                  <AppLink
                    href={item.href}
                    navigate={navigate}
                    className={st.siteNavLink}
                    {...linkAriaCurrent}
                  >
                    {item.label}
                  </AppLink>
                </li>
              );
            })}
          </ul>
        </nav>
        <button
          type="button"
          className={`${st.themeToggle} ${theme === 'dark' ? st.themeToggleDark : ''}`}
          onClick={onThemeToggle}
          aria-label={`Switch to ${nextThemeLabel} theme`}
        >
          <span className={st.themeIconWrap} aria-hidden="true">
            <svg viewBox="0 0 24 24" className={st.themeIconSun}>
              <path
                fill="currentColor"
                d="M12 3.75a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V4.5a.75.75 0 0 1 .75-.75Zm0 13.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V18a.75.75 0 0 1 .75-.75ZM20.25 12a.75.75 0 0 1-.75.75H18a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75ZM6 12a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 6 12Zm10.03-5.78a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 0 1-1.06 1.06l-1.06-1.06a.75.75 0 0 1 0-1.06ZM5.85 16.4a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 1 1-1.06 1.06L5.85 17.46a.75.75 0 0 1 0-1.06Zm12.36 2.12a.75.75 0 0 1-1.06 0l-1.06-1.06a.75.75 0 0 1 1.06-1.06l1.06 1.06a.75.75 0 0 1 0 1.06ZM7.97 6.22a.75.75 0 0 1 0 1.06L6.9 8.34A.75.75 0 1 1 5.84 7.28L6.9 6.22a.75.75 0 0 1 1.06 0ZM12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z"
              />
            </svg>
            <svg viewBox="0 0 24 24" className={st.themeIconMoon}>
              <path
                fill="currentColor"
                d="M14.7 2.9a.75.75 0 0 1 .6 1.16A7.1 7.1 0 1 0 19.94 14.7a.75.75 0 0 1 1.16.6 9.1 9.1 0 1 1-6.4-12.4Zm4.58-.15a.75.75 0 0 1 .73.58l.15.62a.9.9 0 0 0 .66.66l.62.15a.75.75 0 0 1 0 1.46l-.62.15a.9.9 0 0 0-.66.66l-.15.62a.75.75 0 0 1-1.46 0l-.15-.62a.9.9 0 0 0-.66-.66l-.62-.15a.75.75 0 0 1 0-1.46l.62-.15a.9.9 0 0 0 .66-.66l.15-.62a.75.75 0 0 1 .73-.58Z"
              />
            </svg>
          </span>
        </button>
      </Container>
    </header>
  );
};
