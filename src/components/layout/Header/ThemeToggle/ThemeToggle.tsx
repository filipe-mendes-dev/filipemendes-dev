"use client";

import type { ReactElement } from 'react';

import { MoonIcon, SunIcon } from '../../../icons';
import { useThemePreference } from '../../../../shared/theme/useThemePreference';
import type { ThemeToggleProps } from './ThemeToggle.interfaces';
import st from './ThemeToggle.module.css';

export const ThemeToggle = ({
  className,
  size = 'default',
}: ThemeToggleProps): ReactElement => {
  const { theme, themeToggleLabel, toggleTheme } = useThemePreference();

  return (
    <button
      type="button"
      className={`${st.root} ${size === 'compact' ? st.compact : ''} ${className ?? ''}`.trim()}
      onClick={toggleTheme}
      aria-label={themeToggleLabel}
      aria-pressed={theme === 'dark'}
      title={themeToggleLabel}
    >
      <span className={st.iconWrap} aria-hidden="true">
        <SunIcon className={st.iconSun} />
        <MoonIcon className={st.iconMoon} />
      </span>
    </button>
  );
};
