export interface ThemeTokens {
  'paper': string;
  'paper-raised': string;
  'card-bg': string;
  'code-bg': string;
  'code-border': string;
  'code-ink': string;
  'ink': string;
  'ink-soft': string;
  'ink-muted': string;
  'ink-inverse': string;
  'surface-inverse': string;
  'stone': string;
  'chip-bg': string;
  'button-secondary-bg': string;
  'header-bg': string;
  'footer-bg': string;
  'hero-home-bg': string;
  'hero-projects-bg': string;
  'hero-about-bg': string;
  'hero-contact-bg': string;
  'accent-soft': string;
  'moss-faint': string;
  'signal-red': string;
  'signal-yellow': string;
  'signal-green': string;
  'sun-accent': string;
  'moon-accent': string;
  'texture-dot': string;
  'texture-opacity': string;
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
  'font-size-body-sm': string;
  'font-size-body': string;
  'font-size-body-lg': string;
  'font-size-body-xl': string;
  'font-size-heading-sm': string;
  'font-size-heading-md': string;
  'font-size-heading-lg': string;
  'font-size-title': string;
  'font-size-lead': string;
  'line-height-body': string;
  'line-height-heading': string;
  'line-height-title': string;
  'line-height-display': string;
  'font-display': string;
  'font-body': string;
  'font-mono': string;
  'space-1': string;
  'space-2': string;
  'space-3': string;
  'space-4': string;
  'space-5': string;
  'space-6': string;
  'container': string;
  'content-max-narrow': string;
  'content-max-readable': string;
  'content-max-wide': string;
  'section-padding-y': string;
  'section-padding-y-lg': string;
  'panel-padding': string;
  'panel-padding-compact': string;
  'control-height-md': string;
  'control-height-lg': string;
  'control-padding-md': string;
  'control-padding-lg': string;
  'icon-size-sm': string;
  'icon-size-xs': string;
  'icon-size-md': string;
  'header-offset': string;
  'shadow-tint': string;
  'transition': string;
  'motion-unit': string;
  'motion-duration-xs': string;
  'motion-duration-sm': string;
  'motion-duration-md': string;
  'motion-duration-lg': string;
  'motion-duration-xl': string;
  'motion-duration-2xl': string;
  'motion-stagger-sm': string;
  'motion-stagger-md': string;
  'motion-ease-standard': string;
  'motion-ease-emphasized': string;
}

export type ThemeName = 'light' | 'dark';

const commonThemeTokens: Pick<
  ThemeTokens,
  | 'radius-lg'
  | 'radius-md'
  | 'radius-sm'
  | 'radius-pill'
  | 'radius-xl'
  | 'radius-2xl'
  | 'font-size-caption'
  | 'font-size-sm'
  | 'font-size-body-sm'
  | 'font-size-body'
  | 'font-size-body-lg'
  | 'font-size-body-xl'
  | 'font-size-heading-sm'
  | 'font-size-heading-md'
  | 'font-size-heading-lg'
  | 'font-size-title'
  | 'font-size-lead'
  | 'line-height-body'
  | 'line-height-heading'
  | 'line-height-title'
  | 'line-height-display'
  | 'font-display'
  | 'font-body'
  | 'font-mono'
  | 'space-1'
  | 'space-2'
  | 'space-3'
  | 'space-4'
  | 'space-5'
  | 'space-6'
  | 'container'
  | 'content-max-narrow'
  | 'content-max-readable'
  | 'content-max-wide'
  | 'section-padding-y'
  | 'section-padding-y-lg'
  | 'panel-padding'
  | 'panel-padding-compact'
  | 'control-height-md'
  | 'control-height-lg'
  | 'control-padding-md'
  | 'control-padding-lg'
  | 'icon-size-sm'
  | 'icon-size-xs'
  | 'icon-size-md'
  | 'header-offset'
  | 'line-strong'
  | 'transition'
  | 'motion-unit'
  | 'motion-duration-xs'
  | 'motion-duration-sm'
  | 'motion-duration-md'
  | 'motion-duration-lg'
  | 'motion-duration-xl'
  | 'motion-duration-2xl'
  | 'motion-stagger-sm'
  | 'motion-stagger-md'
  | 'motion-ease-standard'
  | 'motion-ease-emphasized'
> = {
  'line-strong': '1px',
  'radius-lg': '1rem',
  'radius-md': '0.9rem',
  'radius-sm': '0.6rem',
  'radius-pill': '999px',
  'radius-xl': '1.25rem',
  'radius-2xl': '1.5rem',
  'font-size-caption': '0.75rem',
  'font-size-sm': '0.875rem',
  'font-size-body-sm': '0.8125rem',
  'font-size-body': 'clamp(0.95rem, 0.92rem + 0.15vw, 1rem)',
  'font-size-body-lg': 'clamp(1.1rem, 1.03rem + 0.45vw, 1.35rem)',
  'font-size-body-xl': 'clamp(2rem, 1.5rem + 2.5vw, 4rem)',
  'font-size-heading-sm': 'clamp(1.02rem, 0.95rem + 0.2vw, 1.16rem)',
  'font-size-heading-md': 'clamp(1.05rem, 0.96rem + 0.2vw, 1.2rem)',
  'font-size-heading-lg': 'clamp(1.2rem, 1.1rem + 0.3vw, 1.35rem)',
  'font-size-title': 'clamp(1.7rem, 3.4vw, 2.35rem)',
  'font-size-lead': 'clamp(1rem, 0.96rem + 0.2vw, 1.1rem)',
  'line-height-body': '1.65',
  'line-height-heading': '1.2',
  'line-height-title': '1.14',
  'line-height-display': '1.16',
  'font-display': '"Space Grotesk", "Segoe UI", sans-serif',
  'font-body': '"Manrope", "Segoe UI", sans-serif',
  'font-mono': '"IBM Plex Mono", "SFMono-Regular", monospace',
  'space-1': '0.5rem',
  'space-2': '0.75rem',
  'space-3': '1rem',
  'space-4': '1.5rem',
  'space-5': '2rem',
  'space-6': 'clamp(2.5rem, 5vw, 4rem)',
  container: 'min(100% - clamp(2rem, 6vw, 4.5rem), 72rem)',
  'content-max-narrow': '34ch',
  'content-max-readable': '62ch',
  'content-max-wide': '54rem',
  'section-padding-y': 'var(--space-5)',
  'section-padding-y-lg': 'var(--space-6)',
  'panel-padding': 'clamp(1rem, 1.6vw, 1.25rem)',
  'panel-padding-compact': 'clamp(0.85rem, 1.35vw, 1rem)',
  'control-height-md': '2.75rem',
  'control-height-lg': '2.85rem',
  'control-padding-md': '0.55rem 0.85rem',
  'control-padding-lg': '0.7rem 1.05rem',
  'icon-size-sm': '1rem',
  'icon-size-xs': '0.85rem',
  'icon-size-md': '1.25rem',
  'header-offset': '4.5rem',
  transition: '240ms ease',
  'motion-unit': '60ms',
  'motion-duration-xs': '120ms',
  'motion-duration-sm': '180ms',
  'motion-duration-md': '240ms',
  'motion-duration-lg': '480ms',
  'motion-duration-xl': '600ms',
  'motion-duration-2xl': '840ms',
  'motion-stagger-sm': '60ms',
  'motion-stagger-md': '120ms',
  'motion-ease-standard': 'cubic-bezier(0.2, 0.9, 0.24, 1)',
  'motion-ease-emphasized': 'cubic-bezier(0.22, 1, 0.36, 1)',
};

export const themeTokenSets: Record<ThemeName, ThemeTokens> = {
  light: {
    paper: '#f5f5f3',
    'paper-raised': '#ffffff',
    'card-bg': 'rgb(255 255 255 / 94%)',
    'code-bg': '#eef3fb',
    'code-border': 'rgb(79 121 184 / 36%)',
    'code-ink': '#2f4f82',
    ink: '#23272A',
    'ink-soft': '#3b4044',
    'ink-muted': 'rgb(35 39 42 / 70%)',
    'ink-inverse': '#ffffff',
    'surface-inverse': '#111111',
    stone: '#ecece9',
    'chip-bg': '#f2f2ef',
    'button-secondary-bg': '#f1f1ee',
    'header-bg': 'rgb(250 250 248 / 92%)',
    'footer-bg': '#e2e2df',
    'hero-home-bg': '#f5f5f3',
    'hero-projects-bg': '#ecece9',
    'hero-about-bg': '#f5f5f3',
    'hero-contact-bg': '#ecece9',
    'accent-soft': 'rgb(79 121 184 / 24%)',
    'moss-faint': 'rgb(79 121 184 / 12%)',
    'signal-red': '#f47f7c',
    'signal-yellow': '#f0ba4a',
    'signal-green': '#51b96b',
    'sun-accent': '#f0b35f',
    'moon-accent': '#8eafe7',
    'texture-dot': 'rgb(0 0 0 / 15%)',
    'texture-opacity': '0.012',
    moss: '#4F79B8',
    'moss-strong': '#355F9F',
    clay: '#A9C1E5',
    line: 'rgb(35 39 42 / 14%)',
    'shadow-tint': '0 20px 40px rgb(35 39 42 / 8%)',
    ...commonThemeTokens,
  },
  dark: {
    paper: '#050505',
    'paper-raised': '#111111',
    'card-bg': '#1a1b1f',
    'code-bg': '#121827',
    'code-border': 'rgb(120 166 233 / 42%)',
    'code-ink': '#a6c7f5',
    ink: '#F6F3EB',
    'ink-soft': '#E5DCCF',
    'ink-muted': 'rgb(229 220 207 / 76%)',
    'ink-inverse': '#050505',
    'surface-inverse': '#F6F3EB',
    stone: '#151517',
    'chip-bg': '#1d1d21',
    'button-secondary-bg': '#232328',
    'header-bg': 'rgb(34 35 39 / 90%)',
    'footer-bg': '#000000',
    'hero-home-bg': '#0b0b0c',
    'hero-projects-bg': '#121214',
    'hero-about-bg': '#0b0b0c',
    'hero-contact-bg': '#121214',
    'accent-soft': 'rgb(120 166 233 / 30%)',
    'moss-faint': 'rgb(120 166 233 / 18%)',
    'signal-red': '#e1908d',
    'signal-yellow': '#d8b060',
    'signal-green': '#72bf86',
    'sun-accent': '#f3c47b',
    'moon-accent': '#a6c0ef',
    'texture-dot': 'rgb(255 255 255 / 18%)',
    'texture-opacity': '0.012',
    moss: '#78A6E9',
    'moss-strong': '#97BDF2',
    clay: '#B6CCEE',
    line: 'rgb(234 236 240 / 20%)',
    'shadow-tint': '0 20px 40px rgb(0 0 0 / 30%)',
    ...commonThemeTokens,
  },
};

export const themeTokens: ThemeTokens = themeTokenSets.light;
