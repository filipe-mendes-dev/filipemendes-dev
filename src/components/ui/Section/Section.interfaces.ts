import type { ReactNode, Ref } from 'react';

export interface SectionRevealState {
  value: 'pending' | 'visible';
}

export interface SectionProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  id?: string;
  containerClassName?: string;
  contained?: boolean;
  initialHeadingRevealState?: SectionRevealState['value'];
  headerRevealRef?: Ref<HTMLElement>;
  sectionRef?: Ref<HTMLElement>;
}
