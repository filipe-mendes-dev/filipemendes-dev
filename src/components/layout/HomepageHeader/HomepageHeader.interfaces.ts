import type { NavigationItem } from '../../../data/portfolio';

import type { SectionId } from '../../../shared/navigation/sections';

export interface HomepageHeaderProps {
  navigation: NavigationItem[];
  siteTitle: string;
}

export interface HomepageHeaderThemeState {
  theme: 'light' | 'dark';
}

export interface HomepageHeaderLinkDefinition {
  href: string;
  label: string;
  sectionId?: SectionId;
}
