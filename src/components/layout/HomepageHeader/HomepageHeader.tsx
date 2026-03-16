'use client';

import {
  type MouseEvent,
  type ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';

import { ThemeToggle } from '../Header/ThemeToggle';
import type {
  HomepageHeaderLinkDefinition,
  HomepageHeaderProps,
  HomepageHeaderThemeState,
} from './HomepageHeader.interfaces';
import st from './HomepageHeader.module.css';
import { type SectionId, sectionIds } from '../../../shared/navigation/sections';

const themeStorageKey = 'portfolio-theme';
const themeChangeEventName = 'portfolio-theme-change';

const getStoredTheme = (): HomepageHeaderThemeState['theme'] => {
  const rootTheme = document.documentElement.getAttribute('data-theme');

  if (rootTheme === 'light' || rootTheme === 'dark') {
    return rootTheme;
  }

  return 'light';
};

const subscribeToTheme = (onStoreChange: () => void): (() => void) => {
  const handleThemeChange = (): void => {
    onStoreChange();
  };

  window.addEventListener(themeChangeEventName, handleThemeChange);
  window.addEventListener('storage', handleThemeChange);

  return () => {
    window.removeEventListener(themeChangeEventName, handleThemeChange);
    window.removeEventListener('storage', handleThemeChange);
  };
};

const getServerThemeSnapshot = (): HomepageHeaderThemeState['theme'] => {
  return 'light';
};

const getHeaderOffset = (headerElement: HTMLElement): number => {
  return headerElement.offsetHeight;
};

const toLinkDefinition = ({
  href,
  label,
  sectionId,
}: HomepageHeaderProps['navigation'][number]): HomepageHeaderLinkDefinition => {
  return {
    href: sectionId === undefined ? href : `#${sectionId}`,
    label,
    ...(sectionId === undefined ? {} : { sectionId }),
  };
};

const getActiveSection = (headerElement: HTMLElement | null): SectionId => {
  if (headerElement === null) {
    return 'home';
  }

  const activationLine =
    window.scrollY +
    getHeaderOffset(headerElement) +
    window.innerHeight * 0.2;

  let currentSection: SectionId = 'home';

  sectionIds.forEach((sectionId) => {
    const sectionElement = document.getElementById(sectionId);

    if (sectionElement !== null && sectionElement.offsetTop <= activationLine) {
      currentSection = sectionId;
    }
  });

  return currentSection;
};

export const HomepageHeader = ({
  navigation,
  siteTitle,
}: HomepageHeaderProps): ReactElement => {
  const headerRef = useRef<HTMLElement | null>(null);
  const mobileNavRef = useRef<HTMLElement | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const links = useMemo(() => navigation.map(toLinkDefinition), [navigation]);
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getStoredTheme,
    getServerThemeSnapshot,
  );

  useEffect(() => {
    const headerElement = headerRef.current;

    if (headerElement === null) {
      return undefined;
    }

    const syncHeaderOffset = (): void => {
      document.documentElement.style.setProperty(
        '--header-offset',
        `${getHeaderOffset(headerElement)}px`,
      );
      setActiveSection(getActiveSection(headerElement));
    };

    const resizeObserver = new ResizeObserver(() => {
      syncHeaderOffset();
    });

    resizeObserver.observe(headerElement);
    window.addEventListener('scroll', syncHeaderOffset, { passive: true });
    window.addEventListener('resize', syncHeaderOffset);
    const frameId = window.requestAnimationFrame(syncHeaderOffset);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', syncHeaderOffset);
      window.removeEventListener('resize', syncHeaderOffset);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return undefined;
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

  const handleThemeToggle = (): void => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', nextTheme);
    window.localStorage.setItem(themeStorageKey, nextTheme);
    window.dispatchEvent(new Event(themeChangeEventName));
  };

  const handleSectionClick = (
    sectionId: SectionId | undefined,
    event: MouseEvent<HTMLAnchorElement>,
  ): void => {
    if (sectionId === undefined) {
      return;
    }

    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);

    const sectionElement = document.getElementById(sectionId);

    if (sectionElement === null) {
      return;
    }

    event.preventDefault();
    sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${sectionId}`);
  };

  const themeToggleLabel =
    theme === 'light' ? 'Activate dark theme' : 'Activate light theme';

  return (
    <header ref={headerRef} className={st.root}>
      <div className={st.bar}>
        <div className={st.inner}>
          <a
            href="#home"
            className={st.brand}
            aria-current={activeSection === 'home' ? 'page' : undefined}
            aria-label={siteTitle}
            onClick={(event) => {
              handleSectionClick('home', event);
            }}
          >
            <span className={st.brandPrompt} aria-hidden="true">
              {'</>'}
            </span>
            <span className={st.brandText}>filipemendes.dev</span>
          </a>

          <nav aria-label="Primary" className={st.desktopNav}>
            <ul className={`${st.navList} ${st.desktopList}`}>
              {links.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={st.navLink}
                    aria-current={item.sectionId !== undefined && activeSection === item.sectionId ? 'page' : undefined}
                    onClick={(event) => {
                      handleSectionClick(item.sectionId, event);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={st.controls}>
            <div className={st.themeSlot}>
              <ThemeToggle theme={theme} label={themeToggleLabel} onToggle={handleThemeToggle} />
            </div>

            <button
              type="button"
              className={st.menuToggle}
              aria-expanded={isMobileMenuOpen}
              aria-controls="homepage-mobile-nav"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => {
                setIsMobileMenuOpen((currentValue) => !currentValue);
              }}
            >
              <span className={st.menuBars} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </div>

      <nav
        ref={mobileNavRef}
        id="homepage-mobile-nav"
        aria-label="Primary"
        className={`${st.mobileNav} ${isMobileMenuOpen ? st.mobileNavOpen : ''}`}
      >
        <div className={st.mobileInner}>
          <ul className={`${st.navList} ${st.mobileList}`}>
            {links.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={st.navLink}
                  aria-current={item.sectionId !== undefined && activeSection === item.sectionId ? 'page' : undefined}
                  onClick={(event) => {
                    handleSectionClick(item.sectionId, event);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};
