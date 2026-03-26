import { cookies } from "next/headers";
import type { ReactElement, ReactNode } from "react";

import { DocsShell } from "../../components/docs/DocsShell";
import {
  getDocsProjects,
  getFeaturedDocs,
} from "../../data/docs/docs.registry";
import { portfolio } from "../../data/portfolio";
import {
  defaultThemePreference,
  isThemeName,
  themeCookieKey,
} from "../../shared/theme/themePreference";

interface DocsLayoutProps {
  children: ReactNode;
}

const DocsLayout = async ({
  children,
}: DocsLayoutProps): Promise<ReactElement> => {
  const cookieStore = await cookies();
  const persistedTheme = cookieStore.get(themeCookieKey)?.value;
  const initialTheme = isThemeName(persistedTheme)
    ? persistedTheme
    : defaultThemePreference;

  return (
    <DocsShell
      descriptor={portfolio.descriptor}
      featuredDocs={getFeaturedDocs()}
      initialTheme={initialTheme}
      projects={getDocsProjects()}
      siteTitle={portfolio.siteTitle}
    >
      {children}
    </DocsShell>
  );
};

export default DocsLayout;
