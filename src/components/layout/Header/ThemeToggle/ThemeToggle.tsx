import type { ReactElement } from 'react';

import { MoonIcon, SunIcon } from '../../../icons';
import type { ThemeToggleProps } from './ThemeToggle.interfaces';
import st from './ThemeToggle.module.css';

export const ThemeToggle = ({
  theme,
  label,
  onToggle,
  className,
  size = 'default',
}: ThemeToggleProps): ReactElement => {
  return (
    <button
      type="button"
      className={`${st.root} ${size === 'compact' ? st.compact : ''} ${className ?? ''}`.trim()}
      onClick={onToggle}
      aria-label={label}
      aria-pressed={theme === 'dark'}
      title={label}
    >
      <span className={st.iconWrap} aria-hidden="true">
        <SunIcon className={st.iconSun} />
        <MoonIcon className={st.iconMoon} />
      </span>
    </button>
  );
};
