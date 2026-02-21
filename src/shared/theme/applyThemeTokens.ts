import type { ThemeTokens } from './tokens';

export const applyThemeTokens = (tokens: ThemeTokens): void => {
  const root = document.documentElement;

  (Object.keys(tokens) as (keyof ThemeTokens)[]).forEach((token) => {
    root.style.setProperty(`--${token}`, tokens[token]);
  });
};
