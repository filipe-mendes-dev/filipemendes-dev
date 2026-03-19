import type { ThemeName } from '../../../../shared/theme/themePreference';

export interface ThemeToggleProps {
  theme: ThemeName;
  label: string;
  onToggle: () => void;
  className?: string;
  size?: 'default' | 'compact';
}
