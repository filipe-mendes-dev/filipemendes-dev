import type { Metadata } from 'next';
import type { ReactElement, ReactNode } from 'react';

import '../shared/theme/theme.css';
import '../shared/styles/reset.css';
import '../shared/styles/base.css';

export const metadata: Metadata = {
  title: 'Filipe Mendes',
  description: 'Incremental Next.js App Router migration foundation for the portfolio website.',
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps): ReactElement => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
