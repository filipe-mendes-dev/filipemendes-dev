import type { ReactNode } from 'react';

export interface AppLinkProps {
  href: string;
  navigate: (href: string) => void;
  className?: string | undefined;
  children: ReactNode;
  ariaCurrent?: 'page';
}
