import type { ComponentType, ReactNode } from 'react';

export interface AboutSupportSectionProps {
  children: ReactNode;
  className?: string;
  icon: ComponentType<{ className?: string }>;
  title: string;
}
