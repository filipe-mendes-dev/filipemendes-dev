'use client';

import { useSyncExternalStore } from 'react';

import type { ThemeName } from './tokens';

const themeStorageKey = 'portfolio-theme';
const themeChangeEventName = 'portfolio-theme-change';

const getStoredTheme = (): ThemeName => {
  const rootTheme = document.documentElement.getAttribute('data-theme');

  if (rootTheme === 'light' || rootTheme === 'dark') {
    return rootTheme;
  }

  return 'light';
};

const subscribeToTheme = (onStoreChange: () => void): (() => void) => {
  const handleThemeChange = (): void => {
    onStoreChange();
  };

  window.addEventListener(themeChangeEventName, handleThemeChange);
  window.addEventListener('storage', handleThemeChange);

  return () => {
    window.removeEventListener(themeChangeEventName, handleThemeChange);
    window.removeEventListener('storage', handleThemeChange);
  };
};

const getServerThemeSnapshot = (): ThemeName => {
  return 'light';
};

const setThemePreference = (theme: ThemeName): void => {
  document.documentElement.setAttribute('data-theme', theme);
  window.localStorage.setItem(themeStorageKey, theme);
  window.dispatchEvent(new Event(themeChangeEventName));
};

interface ThemePreferenceResult {
  theme: ThemeName;
  toggleTheme: () => void;
}

export const useThemePreference = (): ThemePreferenceResult => {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getStoredTheme,
    getServerThemeSnapshot,
  );

  const toggleTheme = (): void => {
    setThemePreference(theme === 'light' ? 'dark' : 'light');
  };

  return {
    theme,
    toggleTheme,
  };
};
