import type { NavigationItem } from '../../../data/portfolio';
import type { ThemeName } from '../../../shared/theme/themePreference';

export interface HeaderProps {
  initialTheme: ThemeName;
  siteTitle: string;
  navigation: NavigationItem[];
}
