import type { ReactNode } from 'react';

export interface SectionProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  contentClassName?: string;
  id?: string;
  hasSeparator?: boolean;
}

export interface LandingPageSectionProps extends SectionProps {
  isRevealEnabled?: boolean;
}
