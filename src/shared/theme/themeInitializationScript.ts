interface ThemeInitializationScriptOptions {
  defaultThemePreference: "light" | "dark";
  themeStorageKey: string;
}

export const getThemeInitializationScript = ({
  defaultThemePreference,
  themeStorageKey,
}: ThemeInitializationScriptOptions): string => {
  const serializedStorageKey = JSON.stringify(themeStorageKey);
  const serializedDefaultTheme = JSON.stringify(defaultThemePreference);

  return `
(() => {
  const storageKey = ${serializedStorageKey};

  try {
    const persistedTheme = window.localStorage.getItem(storageKey);
    const theme =
      persistedTheme === 'light' || persistedTheme === 'dark'
        ? persistedTheme
        : ${serializedDefaultTheme};

    document.documentElement.setAttribute('data-theme', theme);
  } catch {
    document.documentElement.setAttribute('data-theme', ${serializedDefaultTheme});
  }
})();
`;
};
