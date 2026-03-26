import { cookies } from "next/headers";
import type { ReactElement, ReactNode } from "react";

import { Footer } from "../../components/layout/Footer/Footer";
import { Header } from "../../components/layout/Header/Header";
import { portfolio } from "../../data/portfolio";
import st from "../layout.module.css";
import {
  defaultThemePreference,
  isThemeName,
  themeCookieKey,
} from "../../shared/theme/themePreference";

interface SiteLayoutProps {
  children: ReactNode;
}

const SiteLayout = async ({
  children,
}: SiteLayoutProps): Promise<ReactElement> => {
  const cookieStore = await cookies();
  const persistedTheme = cookieStore.get(themeCookieKey)?.value;
  const initialTheme = isThemeName(persistedTheme)
    ? persistedTheme
    : defaultThemePreference;
  const linkedInUrl = portfolio.contact.socials.find(
    (social) => social.label === "LinkedIn",
  )?.href;
  const githubUrl = portfolio.contact.socials.find(
    (social) => social.label === "GitHub",
  )?.href;

  return (
    <>
      <Header
        initialTheme={initialTheme}
        navigation={portfolio.navigation}
        siteTitle={portfolio.siteTitle}
      />
      <main className={st.main}>{children}</main>
      <Footer
        descriptor={portfolio.descriptor}
        githubUrl={githubUrl}
        linkedInUrl={linkedInUrl}
        name={portfolio.siteTitle}
      />
    </>
  );
};

export default SiteLayout;
