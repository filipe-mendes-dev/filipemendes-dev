import type { ReactNode } from 'react';

export interface SectionProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  contentClassName?: string;
  id?: string;
}

export interface LandingPageSectionProps extends SectionProps {
  isRevealEnabled?: boolean;
}
