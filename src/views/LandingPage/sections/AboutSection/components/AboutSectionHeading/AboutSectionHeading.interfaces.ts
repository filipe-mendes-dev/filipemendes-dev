import type { ComponentType } from 'react';

export interface AboutSectionHeadingProps {
  title: string;
  icon: ComponentType<{ className?: string }>;
  variant?: 'primary' | 'secondary';
}
