import { type ReactElement, useLayoutEffect, useMemo, useRef } from 'react';

import { MoonIcon, SunIcon } from '../../icons';
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
  const themeToggleLabel = theme === 'light' ? 'Activate dark theme' : 'Activate light theme';

  useLayoutEffect(() => {
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
      const isLandingSection = pathname === '/' && activeSection !== undefined;

      if (isLandingSection) {
        accumulator[item.href] = sectionFromHref !== undefined && activeSection === sectionFromHref;

        return accumulator;
      }

      const isProjectDetailMatch = sectionFromHref === 'projects' && pathname.startsWith('/projects/');
      const isCurrentPath = currentHref === item.href;

      accumulator[item.href] = isProjectDetailMatch || isCurrentPath;

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
        <nav aria-label="Primary" className={st.headerNav}>
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
          aria-label={themeToggleLabel}
          aria-pressed={theme === 'dark'}
          title={themeToggleLabel}
        >
          <span className={st.themeIconWrap} aria-hidden="true">
            <SunIcon className={st.themeIconSun} />
            <MoonIcon className={st.themeIconMoon} />
          </span>
        </button>
      </Container>
    </header>
  );
};
