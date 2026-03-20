import type { Metadata } from 'next';
import Script from 'next/script';
import type { ReactElement, ReactNode } from 'react';

import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { portfolio } from '../data/portfolio';
import { getThemeInitializationScript } from '../shared/theme/themeInitializationScript';
import { defaultThemePreference, themeStorageKey } from '../shared/theme/themePreference';
import '../shared/theme/theme.css';
import '../shared/styles/reset.css';
import '../shared/styles/base.css';
import st from './layout.module.css';

export const metadata: Metadata = {
  title: 'Filipe Mendes',
  description: 'Incremental Next.js App Router migration foundation for the portfolio website.',
};

interface RootLayoutProps {
  children: ReactNode;
}

const getSocialLink = (label: string): string | undefined => {
  const socialLink = portfolio.contact.socials.find(
    (item) => item.label.toLowerCase() === label.toLowerCase(),
  );

  return socialLink?.href;
};

const RootLayout = ({ children }: RootLayoutProps): ReactElement => {
  const githubUrl = getSocialLink('GitHub');
  const linkedInUrl = getSocialLink('LinkedIn');
  const themeInitializationScript = getThemeInitializationScript({
    defaultThemePreference,
    themeStorageKey,
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={st.body}>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitializationScript}
        </Script>
        <Header
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
      </body>
    </html>
  );
};

export default RootLayout;
