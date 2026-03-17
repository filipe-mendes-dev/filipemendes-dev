import { type ReactElement, useEffect, useState } from 'react';

import st from './App.module.css';
import { AppLink } from './components/navigation/AppLink';
import { portfolio } from './data/portfolio';
import { usePathnameRouter } from './lib/pathname-router';
import { LandingPage } from './pages/LandingPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import type { SectionId } from './shared/navigation/sections';
import su from './shared/styles/utilities.module.css';
import { applyThemeTokens } from './shared/theme/applyThemeTokens';
import { type ThemeName, themeTokenSets } from './shared/theme/tokens';

const themeStorageKey = 'portfolio-theme';

const getInitialTheme = (): ThemeName => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const persistedTheme = window.localStorage.getItem(themeStorageKey);

  if (persistedTheme === 'light' || persistedTheme === 'dark') {
    return persistedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getSafeSection = (sectionId: SectionId | undefined): SectionId => {
  return sectionId ?? 'home';
};

export const App = (): ReactElement => {
  const { currentHref, route, navigate } = usePathnameRouter();
  const [theme] = useState<ThemeName>(() => getInitialTheme());
  const [visibleSection, setVisibleSection] = useState<SectionId>(() => getSafeSection(route.sectionId));
  const [requestedSection, setRequestedSection] = useState<SectionId>('home');
  const [sectionRequestNonce, setSectionRequestNonce] = useState(0);

  useEffect(() => {
    applyThemeTokens(themeTokenSets[theme]);
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem(themeStorageKey, theme);
  }, [theme]);

  const handleNavigate = (href: string): void => {
    if (href === '/') {
      setRequestedSection('home');
      setSectionRequestNonce((currentNonce) => currentNonce + 1);
    }

    navigate(href);
  };

  const handleSectionRequest = (sectionId: SectionId, href: string): void => {
    setVisibleSection(sectionId);
    setRequestedSection(sectionId);
    setSectionRequestNonce((currentNonce) => currentNonce + 1);
    navigate(href);
  };

  const page = (() => {
    switch (route.page) {
      case 'landing':
        return (
          <LandingPage
            content={portfolio}
            navigate={handleNavigate}
            activeSection={visibleSection}
            requestedSection={requestedSection}
            requestedSectionKey={`${currentHref}:${sectionRequestNonce}`}
            onSectionRequest={(sectionId) => {
              handleSectionRequest(sectionId, '/');
            }}
            onActiveSectionChange={setVisibleSection}
          />
        );
      case 'project-detail': {
        const project = portfolio.projects.find((item) => item.slug === route.projectSlug);

        if (project === undefined) {
          return (
            <NotFoundPage
              primaryAction={
                <AppLink href="/" navigate={navigate} className={`${su.button} ${su.buttonPrimary}`}>
                  Return Home
                </AppLink>
              }
            />
          );
        }

          return <ProjectDetailPage project={project} navigate={handleNavigate} />;
        }
      default:
        return (
          <NotFoundPage
            primaryAction={
              <AppLink href="/" navigate={handleNavigate} className={`${su.button} ${su.buttonPrimary}`}>
                Return Home
              </AppLink>
            }
          />
        );
    }
  })();

  return (
    <div className={`${st.root} ${st.siteShell}`}>
      <main className={st.main}>{page}</main>
    </div>
  );
};
