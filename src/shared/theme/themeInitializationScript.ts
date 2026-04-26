interface ThemeInitializationScriptOptions {
  defaultThemePreference: "light" | "dark";
  themeCookieKey: string;
  themeStorageKey: string;
}

export const getThemeInitializationScript = ({
  defaultThemePreference,
  themeCookieKey,
  themeStorageKey,
}: ThemeInitializationScriptOptions): string => {
  const serializedCookieKey = JSON.stringify(themeCookieKey);
  const serializedStorageKey = JSON.stringify(themeStorageKey);
  const serializedDefaultTheme = JSON.stringify(defaultThemePreference);

  return `
(() => {
  const cookieKey = ${serializedCookieKey};
  const storageKey = ${serializedStorageKey};
  const getCookieTheme = () => {
    const cookiePrefix = \`\${cookieKey}=\`;
    const cookieEntries = document.cookie.split(';');

    for (const cookieEntry of cookieEntries) {
      const normalizedCookie = cookieEntry.trim();

      if (normalizedCookie.startsWith(cookiePrefix)) {
        const cookieValue = normalizedCookie.slice(cookiePrefix.length);

        return cookieValue === 'light' || cookieValue === 'dark' ? cookieValue : null;
      }
    }

    return null;
  };

  try {
    const persistedTheme = getCookieTheme();
    const theme =
      persistedTheme === 'light' || persistedTheme === 'dark'
        ? persistedTheme
        : ${serializedDefaultTheme};

    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem(storageKey, theme);
  } catch {
    document.documentElement.setAttribute('data-theme', ${serializedDefaultTheme});
  }
})();
`;
};
