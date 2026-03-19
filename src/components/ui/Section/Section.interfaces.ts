import type { HTMLAttributes, ReactNode, Ref } from 'react';
import type { SectionId } from '../../../shared/navigation/sections';

export interface SectionRevealState {
  value: 'pending' | 'visible';
}

export interface SectionHeaderProps extends HTMLAttributes<HTMLElement> {
  'data-landing-section-heading'?: SectionId;
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
  headerProps?: SectionHeaderProps;
  headerRevealRef?: Ref<HTMLElement>;
  sectionRef?: Ref<HTMLElement>;
}
