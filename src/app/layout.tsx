import type { Metadata } from "next";
import { cookies } from "next/headers";
import Script from "next/script";
import type { ReactElement, ReactNode } from "react";

import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import type { SocialLink } from "../data/site/contact.data";
import { getShellViewModel } from "../data/view-models/shell.view-model";
import { appFontVariables } from "./fonts";
import { getThemeInitializationScript } from "../shared/theme/themeInitializationScript";
import {
  defaultThemePreference,
  isThemeName,
  themeCookieKey,
  themeStorageKey,
} from "../shared/theme/themePreference";
import "../shared/theme/theme.css";
import "../shared/styles/reset.css";
import "../shared/styles/base.css";
import st from "./layout.module.css";

export const metadata: Metadata = {
  title: "Filipe Mendes",
  description:
    "Incremental Next.js App Router migration foundation for the portfolio website.",
};

interface RootLayoutProps {
  children: ReactNode;
}

const getSocialLink = (
  label: string,
  socials: SocialLink[],
): string | undefined => {
  const socialLink = socials.find(
    (item) => item.label.toLowerCase() === label.toLowerCase()
  );

  return socialLink?.href;
};

const RootLayout = async ({
  children,
}: RootLayoutProps): Promise<ReactElement> => {
  const shellViewModel = getShellViewModel();
  const githubUrl = getSocialLink("GitHub", shellViewModel.footerSocials);
  const linkedInUrl = getSocialLink("LinkedIn", shellViewModel.footerSocials);
  const cookieStore = await cookies();
  const persistedTheme = cookieStore.get(themeCookieKey)?.value;
  const initialTheme = isThemeName(persistedTheme)
    ? persistedTheme
    : defaultThemePreference;
  const themeInitializationScript = getThemeInitializationScript({
    defaultThemePreference,
    themeCookieKey,
    themeStorageKey,
  });

  return (
    <html lang="en" data-theme={initialTheme}>
      <body className={`${st.body} ${appFontVariables}`}>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitializationScript}
        </Script>
        <Header
          initialTheme={initialTheme}
          navigation={shellViewModel.navigation}
          siteTitle={shellViewModel.siteTitle}
        />
        <main className={st.main}>{children}</main>
        <Footer
          descriptor={shellViewModel.descriptor}
          githubUrl={githubUrl}
          linkedInUrl={linkedInUrl}
          name={shellViewModel.siteTitle}
        />
      </body>
    </html>
  );
};

export default RootLayout;
