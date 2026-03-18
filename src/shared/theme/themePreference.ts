export type ThemeName = 'light' | 'dark';

export const themeStorageKey = 'portfolio-theme';
export const defaultThemePreference: ThemeName = 'dark';

export const getStoredThemePreference = (): ThemeName => {
  if (typeof document === 'undefined') {
    return defaultThemePreference;
  }

  const rootTheme = document.documentElement.getAttribute('data-theme');

  return rootTheme === 'light' ? 'light' : defaultThemePreference;
};

export const setStoredThemePreference = (theme: ThemeName): void => {
  document.documentElement.setAttribute('data-theme', theme);
  window.localStorage.setItem(themeStorageKey, theme);
};
