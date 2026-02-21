import type { NavigationItem } from '../../../data/portfolio';
import type { SectionId } from '../../../shared/navigation/sections';
import type { ThemeName } from '../../../shared/theme/tokens';

export interface HeaderProps {
  siteTitle: string;
  navigation: NavigationItem[];
  pathname: string;
  currentHref: string;
  activeSection?: SectionId;
  navigate: (href: string) => void;
  theme: ThemeName;
  onThemeToggle: () => void;
}
