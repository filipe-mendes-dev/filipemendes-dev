export type ThemeName = 'light' | 'dark';

export const themeStorageKey = 'portfolio-theme';
export const themeCookieKey = 'portfolio-theme';
export const defaultThemePreference: ThemeName = 'dark';

export const isThemeName = (value: string | null | undefined): value is ThemeName => {
  return value === 'light' || value === 'dark';
};

export const getStoredThemePreference = (): ThemeName => {
  if (typeof document === 'undefined') {
    return defaultThemePreference;
  }

  const rootTheme = document.documentElement.getAttribute('data-theme');

  if (isThemeName(rootTheme)) {
    return rootTheme;
  }

  const persistedTheme = window.localStorage.getItem(themeStorageKey);

  return isThemeName(persistedTheme) ? persistedTheme : defaultThemePreference;
};

export const setStoredThemePreference = (theme: ThemeName): void => {
  document.documentElement.setAttribute('data-theme', theme);
  window.localStorage.setItem(themeStorageKey, theme);
  document.cookie = `${themeCookieKey}=${theme}; path=/; max-age=31536000; samesite=lax`;
};
