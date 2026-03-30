import type { Metadata } from "next";
import { cookies } from "next/headers";
import Script from "next/script";
import type { ReactElement, ReactNode } from "react";

import { appFontVariables } from "./fonts";
import { getThemeInitializationScript } from "../shared/theme/themeInitializationScript";
import {
  defaultThemePreference,
  isThemeName,
  themeCookieKey,
  themeStorageKey,
} from "../shared/theme/themePreferenceStore";
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

const RootLayout = async ({
  children,
}: RootLayoutProps): Promise<ReactElement> => {
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
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
