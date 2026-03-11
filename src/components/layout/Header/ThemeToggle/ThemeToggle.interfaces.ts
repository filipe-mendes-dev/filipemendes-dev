import type { ThemeName } from '../../../../shared/theme/tokens';

export interface ThemeToggleProps {
  theme: ThemeName;
  label: string;
  onToggle: () => void;
  className?: string;
  size?: 'default' | 'compact';
}
