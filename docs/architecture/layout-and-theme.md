# Layout and Theme

## Purpose

This document explains the responsibilities of the root layout and the current theme system.

## Root Layout Ownership

The root layout is defined in `src/app/layout.tsx`.

It owns:

- the root HTML structure
- global CSS imports
- root metadata
- pre-hydration theme initialization
- shared shell mounting for `Header` and `Footer`
- the main route content slot through `<main>{children}</main>`

It does not own:

- route-specific page composition
- section reveal logic
- active section tracking
- user-triggered theme state after hydration

## Global CSS Ownership

`src/app/layout.tsx` imports the global CSS entrypoints once:

- `src/shared/theme/theme.css`
- `src/shared/styles/reset.css`
- `src/shared/styles/base.css`

Current ownership by file:

- `theme.css` → CSS custom properties and font imports
- `reset.css` → reset/normalization rules
- `base.css` → base element defaults such as `html`, `body`, links, focus styles, and reduced-motion overrides

This matches the current architecture: leaf components rely on CSS Modules and shared variables, not repeated global imports.

## Metadata Ownership

`src/app/layout.tsx` exports the root `metadata` object.

Current role:

- provide the base title and description for the site
- serve as fallback metadata for routes that do not override it

Route-specific metadata is added in `src/app/projects/[slug]/page.tsx` via `generateMetadata()`.

## Shared Shell Mounting

`src/app/layout.tsx` mounts:

- `Header` before route content
- `<main>{children}</main>` for route content
- `Footer` after route content

This is the correct shell boundary because the header and footer are shared across all routes.

## Why `<main>{children}</main>` Lives in the Layout

The layout owns the single semantic main-content region for the app.

This keeps:

- page views focused on page content only
- shell semantics consistent across routes
- accessibility structure centralized

## Theme System Overview

The current theme system is based on:

- `data-theme` on `<html>`
- CSS variables in `src/shared/theme/theme.css`
- persisted preference in `localStorage` under `portfolio-theme`
- a client-side subscription model exposed through `src/shared/theme/useThemePreference.ts`

At runtime:

- `theme.css` is the source of truth for theme values
- `data-theme` on `<html>` selects which CSS variable set is active
- `useThemePreference.ts` owns theme selection state only

## Pre-Hydration Theme Bootstrap

Relevant code:

- `src/app/layout.tsx` → `themeInitializationScript`
- `src/app/layout.tsx` → `<Script id="theme-init" strategy="beforeInteractive">`
- `src/shared/theme/useThemePreference.ts`

Current behavior:

1. Read `portfolio-theme` from `localStorage`.
2. If the stored value is `light` or `dark`, use it.
3. Otherwise fall back to `window.matchMedia('(prefers-color-scheme: dark)')`.
4. Set `document.documentElement.setAttribute('data-theme', theme)`.
5. If reading storage fails, fall back to `light`.

Why this lives in the layout:

- it must run before the shared shell hydrates
- it affects global document styling, not one isolated component

## Why `Script` Is Used

The layout uses `next/script` with `strategy="beforeInteractive"` so the theme attribute is set before React hydration.

Without that step:

- the server output would start from the default theme only
- the browser could paint the wrong theme first
- the page could visibly switch theme after hydration

## Why `suppressHydrationWarning` Is Used

The layout renders:

- `<html lang="en" suppressHydrationWarning>`

This is justified because:

- the server cannot know the user’s persisted theme
- the theme bootstrap mutates the DOM before hydration
- React would otherwise warn on a known intentional mismatch

## Runtime Theme Styling

Relevant code:

- `src/shared/theme/theme.css`

Current behavior:

- light theme tokens are defined in `:root`
- dark overrides are defined in `:root[data-theme='dark']`

This means component styling does not need JavaScript theme branching. Components simply read CSS variables such as `var(--paper)`, `var(--ink)`, and `var(--header-bg)`.

## Client Theme Updates

Relevant code:

- `src/shared/theme/useThemePreference.ts` → `getStoredTheme()`
- `src/shared/theme/useThemePreference.ts` → `subscribeToTheme()`
- `src/shared/theme/useThemePreference.ts` → `setThemePreference()`
- `src/components/layout/Header/Header.tsx` → `useThemePreference()`

Current post-hydration behavior:

- read the current theme from `document.documentElement`
- expose that value to the `ThemeToggle`
- on toggle, switch `light` ↔ `dark`
- update `data-theme`
- write the new value to `localStorage`
- dispatch the custom `portfolio-theme-change` event

## Why `useSyncExternalStore` Is Used

Relevant code:

- `src/shared/theme/useThemePreference.ts` → `useSyncExternalStore(...)`

The theme is stored outside React in:

- DOM state
- localStorage
- browser events

`useSyncExternalStore` fits this pattern because it gives React:

- a stable read function
- a subscription function
- a server snapshot for SSR/hydration

The current server snapshot returns `light`.

## Why Theme Logic Is Split

The theme logic is intentionally split across two phases.

### Layout-owned phase

Owned by `src/app/layout.tsx`:

- choose a theme before the first paint
- set the global document attribute

### Header-owned phase

Owned by `src/components/layout/Header/Header.tsx`:

- reflect the active theme in the shell UI
- provide the toggle control and label text

### Shared hook phase

Owned by `src/shared/theme/useThemePreference.ts`:

- read the current theme from the DOM
- subscribe to theme change events
- keep `data-theme`, `localStorage`, and the custom event in sync
- expose `theme` and `toggleTheme()` to client UI

This split is correct because the two concerns happen at different lifecycle stages.

## Tight Coupling and Noisy Areas

### Footer social lookup in the layout

Relevant code:

- `src/app/layout.tsx` → `getSocialLink()`

Current state:

- the layout searches `portfolio.contact.socials` by label to build footer props

Why this is coupled:

- shell logic depends on content labels such as `GitHub` and `LinkedIn`
- the footer consumes a narrower model than the source content structure

### Inline theme bootstrap string

Relevant code:

- `src/app/layout.tsx` → `themeInitializationScript`

Current state:

- shell markup and bootstrap logic live in the same file

Why this is noisy:

- it mixes document structure with browser initialization details
- it makes the layout carry both shell composition and low-level bootstrap code

## Theme Token Ownership

Relevant code:

- `src/shared/theme/tokens.ts`
- `src/shared/theme/theme.css`
- `src/components/layout/Header/ThemeToggle/ThemeToggle.interfaces.ts`

Current state:

- `tokens.ts` defines only `ThemeName`
- `theme.css` defines the live CSS variable values used by the app
- `ThemeToggle.interfaces.ts` imports `ThemeName` from `tokens.ts`, so the file remains the small type source for theme naming

Current conclusion:

- `theme.css` is the active runtime theme source of truth
- TypeScript no longer contains parallel runtime token value sets
- the remaining TypeScript theme layer exists only for theme naming and selection-state typing

## Summary

The current layout and theme design is structurally sound:

- one root shell
- one global theme attribute
- CSS-owned theme values
- pre-hydration theme bootstrap in the layout
- post-hydration theme UI in the shared header
- post-hydration theme storage mechanics in `useThemePreference()`

The main issues are not correctness problems. The remaining concerns are footer social extraction in the layout and the inline placement of the bootstrap script.
