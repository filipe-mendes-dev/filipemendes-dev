export interface ThemeTokens {
  'paper': string;
  'ink': string;
  'ink-soft': string;
  'ink-inverse': string;
  'surface-inverse': string;
  'stone': string;
  'moss': string;
  'moss-strong': string;
  'clay': string;
  'line': string;
  'line-strong': string;
  'radius-lg': string;
  'radius-md': string;
  'radius-sm': string;
  'radius-pill': string;
  'radius-xl': string;
  'radius-2xl': string;
  'font-size-caption': string;
  'font-size-sm': string;
  'font-size-body': string;
  'font-size-body-lg': string;
  'font-size-body-xl': string;
  'space-1': string;
  'space-2': string;
  'space-3': string;
  'space-4': string;
  'space-5': string;
  'space-6': string;
  'container': string;
  'shadow-tint': string;
  'transition': string;
}

export const themeTokens: ThemeTokens = {
  paper: '#fdfcf8',
  ink: '#2c2c24',
  'ink-soft': '#444438',
  'ink-inverse': '#ffffff',
  'surface-inverse': '#111111',
  stone: 'rgb(240 235 229 / 68%)',
  moss: '#5d7052',
  'moss-strong': '#4c5d43',
  clay: '#c18c5d',
  line: 'rgb(44 44 36 / 14%)',
  'line-strong': '1px',
  'radius-lg': '1rem',
  'radius-md': '0.9rem',
  'radius-sm': '0.6rem',
  'radius-pill': '999px',
  'radius-xl': '1.25rem',
  'radius-2xl': '1.5rem',
  'font-size-caption': '0.75rem',
  'font-size-sm': '0.85rem',
  'font-size-body': '0.9rem',
  'font-size-body-lg': 'clamp(1.1rem, 2vw, 1.35rem)',
  'font-size-body-xl': 'clamp(2rem, 4vw, 4rem)',
  'space-1': '0.5rem',
  'space-2': '0.75rem',
  'space-3': '1rem',
  'space-4': '1.5rem',
  'space-5': '2rem',
  'space-6': 'clamp(2.5rem, 5vw, 4rem)',
  container: 'min(100% - 2rem, 72rem)',
  'shadow-tint': '0 20px 40px rgb(93 112 82 / 8%)',
  transition: '240ms ease',
};
