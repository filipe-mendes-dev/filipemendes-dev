import type { Metadata } from 'next';
import Script from 'next/script';
import type { ReactElement, ReactNode } from 'react';

import '../shared/theme/theme.css';
import '../shared/styles/reset.css';
import '../shared/styles/base.css';

export const metadata: Metadata = {
  title: 'Filipe Mendes',
  description: 'Incremental Next.js App Router migration foundation for the portfolio website.',
};

const themeInitializationScript = `
(() => {
  const storageKey = 'portfolio-theme';

  try {
    const persistedTheme = window.localStorage.getItem(storageKey);
    const theme =
      persistedTheme === 'light' || persistedTheme === 'dark'
        ? persistedTheme
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';

    document.documentElement.setAttribute('data-theme', theme);
  } catch {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps): ReactElement => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitializationScript}
        </Script>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
