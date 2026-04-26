export type ThemeName = 'light' | 'dark';

export const themeStorageKey = 'portfolio-theme';
export const themeCookieKey = 'portfolio-theme';
export const defaultThemePreference: ThemeName = 'dark';
const themePreferenceChangeEventName = 'portfolio-theme-change';

export const isThemeName = (value: string | null | undefined): value is ThemeName => {
  return value === 'light' || value === 'dark';
};

export const getLocalThemePreference = (): ThemeName | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const persistedTheme = window.localStorage.getItem(themeStorageKey);

  return isThemeName(persistedTheme) ? persistedTheme : null;
};

export const setCookieThemePreference = (theme: ThemeName): void => {
  document.cookie = `${themeCookieKey}=${theme}; path=/; max-age=31536000; samesite=lax`;
};

export const dispatchThemePreferenceChange = (): void => {
  window.dispatchEvent(new Event(themePreferenceChangeEventName));
};

export const applyThemePreference = (
  theme: ThemeName,
  {
    persistCookie = true,
    persistLocal = true,
    notify = true,
  }: {
    notify?: boolean;
    persistCookie?: boolean;
    persistLocal?: boolean;
  } = {}
): void => {
  document.documentElement.setAttribute("data-theme", theme);

  if (persistLocal) {
    window.localStorage.setItem(themeStorageKey, theme);
  }

  if (persistCookie) {
    setCookieThemePreference(theme);
  }

  if (notify) {
    dispatchThemePreferenceChange();
  }
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

export const subscribeToThemePreference = (
  onStoreChange: () => void,
): (() => void) => {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  const handleThemePreferenceChange = (): void => {
    onStoreChange();
  };

  const handleStorage = (event: StorageEvent): void => {
    if (event.key === themeStorageKey) {
      onStoreChange();
    }
  };

  window.addEventListener(themePreferenceChangeEventName, handleThemePreferenceChange);
  window.addEventListener('storage', handleStorage);

  return () => {
    window.removeEventListener(
      themePreferenceChangeEventName,
      handleThemePreferenceChange,
    );
    window.removeEventListener('storage', handleStorage);
  };
};

export const setStoredThemePreference = (theme: ThemeName): void => {
  applyThemePreference(theme);
};

export const syncThemePreferenceFromLocalStorage = (): void => {
  const localTheme = getLocalThemePreference();
  const currentTheme = getStoredThemePreference();

  if (localTheme !== null && localTheme !== currentTheme) {
    applyThemePreference(localTheme, { persistLocal: false });
  }
};

export const startThemePreferenceSync = (): (() => void) => {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleStorage = (event: StorageEvent): void => {
    if (event.key !== themeStorageKey || !isThemeName(event.newValue)) {
      return;
    }

    applyThemePreference(event.newValue, { persistLocal: false });
  };

  const handleVisibilityChange = (): void => {
    if (document.visibilityState !== "visible") {
      return;
    }

    syncThemePreferenceFromLocalStorage();
  };

  syncThemePreferenceFromLocalStorage();
  window.addEventListener("storage", handleStorage);
  document.addEventListener("visibilitychange", handleVisibilityChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    document.removeEventListener("visibilitychange", handleVisibilityChange);
  };
};
