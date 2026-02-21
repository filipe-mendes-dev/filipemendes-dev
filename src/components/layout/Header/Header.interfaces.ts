import type { NavigationItem } from '../../../data/portfolio';

export interface HeaderProps {
  siteTitle: string;
  navigation: NavigationItem[];
  pathname: string;
  navigate: (href: string) => void;
}
