import type { ReactNode } from 'react';

export interface SectionProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string | undefined;
  id?: string;
}
