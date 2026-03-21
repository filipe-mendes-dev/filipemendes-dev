import type { NavigationItem } from '../../../data/site/site.data';
import type { ThemeName } from '../../../shared/theme/themePreference';

export interface HeaderProps {
  initialTheme: ThemeName;
  siteTitle: string;
  navigation: NavigationItem[];
}
