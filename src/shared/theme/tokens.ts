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
  'text-overline': string;
  'text-nav': string;
  'text-label': string;
  'text-body': string;
  'text-body-lg': string;
  'text-lead': string;
  'text-section-title': string;
  'text-card-title': string;
  'text-page-title': string;
  'text-action': string;
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
  'motion-duration-3xl': string;
  'motion-duration-4xl': string;
  'motion-stagger-sm': string;
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
  | 'text-overline'
  | 'text-nav'
  | 'text-label'
  | 'text-body'
  | 'text-body-lg'
  | 'text-lead'
  | 'text-section-title'
  | 'text-card-title'
  | 'text-page-title'
  | 'text-action'
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
  | 'motion-duration-3xl'
  | 'motion-duration-4xl'
  | 'motion-stagger-sm'
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
  'text-overline': 'var(--font-size-caption)',
  'text-nav': 'var(--font-size-body)',
  'text-label': 'var(--font-size-caption)',
  'text-body': 'var(--font-size-body)',
  'text-body-lg': 'var(--font-size-body-lg)',
  'text-lead': 'var(--font-size-lead)',
  'text-section-title': 'var(--font-size-title)',
  'text-card-title': 'clamp(1.35rem, 1.22rem + 0.55vw, 1.8rem)',
  'text-page-title': 'clamp(1.5rem, 1.34rem + 0.72vw, 1.95rem)',
  'text-action': 'var(--font-size-body)',
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
  'motion-duration-lg': '300ms',
  'motion-duration-xl': '360ms',
  'motion-duration-2xl': '480ms',
  'motion-duration-3xl': '600ms',
  'motion-duration-4xl': '840ms',
  'motion-stagger-sm': '60ms',
  'motion-ease-standard': 'cubic-bezier(0.2, 0.9, 0.24, 1)',
  'motion-ease-emphasized': 'cubic-bezier(0.22, 1, 0.36, 1)',
};

export const themeTokenSets: Record<ThemeName, ThemeTokens> = {
  light: {
    paper: '#f6f6f4',
    'paper-raised': '#ffffff',
    'card-bg': 'rgb(255 255 255 / 97%)',
    'code-bg': '#edf2f8',
    'code-border': 'rgb(39 88 164 / 26%)',
    'code-ink': '#244066',
    ink: '#1f2328',
    'ink-soft': '#43484d',
    'ink-muted': 'rgb(31 35 40 / 68%)',
    'ink-inverse': '#ffffff',
    'surface-inverse': '#111111',
    stone: '#eceff3',
    'chip-bg': '#eef1f5',
    'button-secondary-bg': '#edf1f5',
    'header-bg': 'rgb(246 248 251 / 74%)',
    'footer-bg': '#d9d7d1',
    'hero-home-bg': '#f6f6f4',
    'hero-projects-bg': '#eff2f6',
    'hero-about-bg': '#f3f5f7',
    'hero-contact-bg': '#eceff3',
    'accent-soft': 'rgb(39 88 164 / 16%)',
    'moss-faint': 'rgb(39 88 164 / 11%)',
    'signal-red': '#f47f7c',
    'signal-yellow': '#f0ba4a',
    'signal-green': '#51b96b',
    'sun-accent': '#876526',
    'moon-accent': '#4a6998',
    'texture-dot': 'rgb(0 0 0 / 11%)',
    'texture-opacity': '0.012',
    moss: '#2758a4',
    'moss-strong': '#1f4586',
    clay: '#8eaad8',
    line: 'rgb(31 35 40 / 15%)',
    'shadow-tint': '0 18px 36px rgb(31 35 40 / 8%)',
    ...commonThemeTokens,
  },
  dark: {
    paper: '#040506',
    'paper-raised': '#0f1114',
    'card-bg': '#15181c',
    'code-bg': '#111625',
    'code-border': 'rgb(120 166 233 / 42%)',
    'code-ink': '#a6c7f5',
    ink: '#F6F3EB',
    'ink-soft': '#E5DCCF',
    'ink-muted': 'rgb(229 220 207 / 76%)',
    'ink-inverse': '#050505',
    'surface-inverse': '#F6F3EB',
    stone: '#0d0f12',
    'chip-bg': '#1a1d22',
    'button-secondary-bg': '#1f232a',
    'header-bg': 'rgb(17 19 23 / 92%)',
    'footer-bg': '#010203',
    'hero-home-bg': '#07090b',
    'hero-projects-bg': '#090b0e',
    'hero-about-bg': '#080a0d',
    'hero-contact-bg': '#0a0c10',
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
    line: 'rgb(234 236 240 / 22%)',
    'shadow-tint': '0 24px 52px rgb(0 0 0 / 38%)',
    ...commonThemeTokens,
  },
};

export const themeTokens: ThemeTokens = themeTokenSets.light;
