import type { Metadata } from "next";
import { cookies } from "next/headers";
import Script from "next/script";
import type { ReactElement, ReactNode } from "react";

import { appFontVariables } from "./fonts";
import { siteMetadata } from "../data/site/site.metadata";
import { ThemePreferenceSync } from "../shared/theme/ThemePreferenceSync";
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
  metadataBase: new URL(siteMetadata.siteUrl),
  title: siteMetadata.title,
  description: siteMetadata.description,
  applicationName: siteMetadata.siteName,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    siteName: siteMetadata.siteName,
    type: "website",
    images: [siteMetadata.openGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.twitterImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
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
        <ThemePreferenceSync />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
