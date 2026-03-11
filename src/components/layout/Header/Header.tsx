import {
  type MouseEvent,
  type ReactElement,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { MoonIcon, SunIcon } from '../../icons';
import { AppLink } from '../../navigation/AppLink';
import { Container } from '../../ui/Container';
import type { HeaderProps } from './Header.interfaces';
import st from './Header.module.css';

export const Header = ({
  siteTitle,
  navigation,
  pathname,
  currentHref,
  activeSection,
  navigate,
  onSectionRequest,
  theme,
  onThemeToggle,
}: HeaderProps): ReactElement => {
  const headerRef = useRef<HTMLElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const mobileNavId = useId();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const homeLinkAriaCurrent = pathname === '/' && activeSection === 'home' ? { ariaCurrent: 'page' as const } : {};
  const themeToggleLabel = theme === 'light' ? 'Activate dark theme' : 'Activate light theme';
  const mobileMenuLabel = isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu';

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

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent): void => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      const isInsideHeader = headerRef.current?.contains(target) ?? false;
      const isInsideMobileNav = mobileNavRef.current?.contains(target) ?? false;

      if (isInsideHeader || isInsideMobileNav) {
        return;
      }

      setIsMobileMenuOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isMobileMenuOpen]);

  const linkStatusMap = useMemo(() => {
    return navigation.reduce<Record<string, boolean>>((accumulator, item) => {
      const isLandingSection = pathname === '/' && activeSection !== undefined;

      if (isLandingSection) {
        accumulator[item.label] = item.sectionId !== undefined && activeSection === item.sectionId;

        return accumulator;
      }

      const isProjectDetailMatch = item.sectionId === 'projects' && pathname.startsWith('/projects/');
      const isCurrentPath = currentHref === item.href;

      accumulator[item.label] = isProjectDetailMatch || isCurrentPath;

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
        <button
          type="button"
          className={st.menuToggle}
          aria-expanded={isMobileMenuOpen}
          aria-controls={mobileNavId}
          aria-label={mobileMenuLabel}
          onClick={() => {
            setIsMobileMenuOpen((currentValue) => !currentValue);
          }}
        >
          <span className={st.menuToggleBars} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
        <button
          type="button"
          className={`${st.themeToggle} ${st.desktopThemeToggle} ${theme === 'dark' ? st.themeToggleDark : ''}`}
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
      <nav
        ref={mobileNavRef}
        id={mobileNavId}
        aria-label="Primary"
        className={`${st.headerNav} ${isMobileMenuOpen ? st.headerNavOpen : ''}`}
      >
        <div className={st.headerNavInner}>
          <ul className={st.siteNavList}>
            {navigation.map((item) => {
              const sectionId = item.sectionId;
              const isCurrent = linkStatusMap[item.label];
              const linkAriaCurrent = isCurrent ? { ariaCurrent: 'page' as const } : {};

              return (
                <li key={item.href}>
                  <AppLink
                    href={item.href}
                    navigate={navigate}
                    className={st.siteNavLink}
                    onClick={(event: MouseEvent<HTMLAnchorElement>): void => {
                      setIsMobileMenuOpen(false);

                      if (sectionId === undefined) {
                        return;
                      }

                      event.preventDefault();
                      onSectionRequest(sectionId, item.href);
                    }}
                    {...linkAriaCurrent}
                  >
                    {item.label}
                  </AppLink>
                </li>
              );
            })}
          </ul>
          <div className={st.mobileMenuFooter}>
            <span className={st.mobileMenuLabel}>Theme</span>
            <button
              type="button"
              className={`${st.themeToggle} ${st.mobileThemeToggle} ${theme === 'dark' ? st.themeToggleDark : ''}`}
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
          </div>
        </div>
      </nav>
    </header>
  );
};
