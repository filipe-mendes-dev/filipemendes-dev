import { type ReactElement, useEffect, useState } from 'react';

import st from './App.module.css';
import { AppLink } from './components/navigation/AppLink';
import { portfolio } from './data/portfolio';
import { usePathnameRouter } from './lib/pathname-router';
import { LandingPage } from './pages/LandingPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
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

export const App = (): ReactElement => {
  const { route, navigate } = usePathnameRouter();
  const [theme] = useState<ThemeName>(() => getInitialTheme());

  useEffect(() => {
    applyThemeTokens(themeTokenSets[theme]);
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem(themeStorageKey, theme);
  }, [theme]);

  const handleNavigate = (href: string): void => {
    navigate(href);
  };

  const page = (() => {
    switch (route.page) {
      case 'landing':
        return <LandingPage content={portfolio} />;
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

          return <ProjectDetailPage project={project} />;
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
