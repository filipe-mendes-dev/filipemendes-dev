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
- small shared theme helpers in `src/shared/theme/themePreference.ts`
- a small client-side local-state bridge inside `src/components/layout/Header/Header.tsx`

At runtime:

- `theme.css` is the source of truth for theme values
- `data-theme` on `<html>` selects which CSS variable set is active
- `themePreference.ts` owns low-level theme read/write helpers
- `Header.tsx` owns the post-hydration theme selection state used by the toggle UI

## Pre-Hydration Theme Bootstrap

Relevant code:

- `src/app/layout.tsx` → `getThemeInitializationScript(...)`
- `src/app/layout.tsx` → `<Script id="theme-init" strategy="beforeInteractive">`
- `src/shared/theme/themeInitializationScript.ts` → `getThemeInitializationScript(...)`
- `src/shared/theme/themePreference.ts`
- `src/components/layout/Header/Header.tsx`

Current behavior:

1. Read `portfolio-theme` from `localStorage`.
2. If the stored value is `light` or `dark`, use it.
3. Otherwise default to `dark`.
4. Set `document.documentElement.setAttribute('data-theme', theme)`.
5. If reading storage fails, fall back to `dark`.

Why this lives in the layout:

- it must run before the shared shell hydrates
- it affects global document styling, not one isolated component
- the layout now imports a shared script generator instead of embedding the raw script body inline

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

- `src/shared/theme/themePreference.ts` → `getStoredThemePreference()`
- `src/shared/theme/themePreference.ts` → `setStoredThemePreference()`
- `src/shared/theme/themePreference.ts` → `defaultThemePreference`
- `src/components/layout/Header/Header.tsx` → `handleThemeToggle()`
- `src/components/layout/Header/Header.tsx` → `useState(defaultThemePreference)`
- `src/components/layout/Header/Header.tsx` → theme sync `useEffect(...)`

Current post-hydration behavior:

- start from the shared default theme in React state
- read the current bootstrapped theme from `document.documentElement` after mount
- expose that value to the `ThemeToggle`
- on toggle, switch `light` ↔ `dark`
- update `data-theme`
- write the new value to `localStorage`
- update header-local React state so the toggle UI stays in sync

## Why `useSyncExternalStore` Is Not Used For Theme

Relevant code:

- `src/components/layout/Header/Header.tsx`
- `src/shared/theme/themePreference.ts`

Current facts:

- `Header.tsx` is already a client component for routing, menu state, layout effects, and DOM interaction
- theme values still live in CSS, but the toggle UI only needs one local `theme` value
- no other live component currently subscribes to theme changes through shared JS state

Current conclusion:

- the dedicated hook was unnecessary
- the theme path is simpler as header-local state plus DOM/localStorage updates

## Why a Dedicated Theme Hook Is No Longer Used

Current facts:

- the removed shared theme hook was only used by `Header.tsx`
- the extra file did not provide reuse because no other component consumed it
- `useSyncExternalStore` is still used elsewhere for landing-page navigation, but it is no longer needed for theme

Current conclusion:

- the theme state path is simpler as small header-local logic
- this does not change the runtime theme model because CSS still owns values and `data-theme` still selects them

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
- initialize local theme state from the shared default
- sync local theme state from the bootstrapped DOM theme after mount
- keep header theme UI state in sync with the selected theme

### Shared utility phase

Owned by `src/shared/theme/themePreference.ts`:

- read the current theme from the DOM
- write the selected theme to `data-theme`
- persist the selected theme to `localStorage`

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

- `src/shared/theme/themeInitializationScript.ts`

Current state:

- bootstrap behavior is still triggered from `layout.tsx`, but script-string generation now lives in shared theme code

Why this is noisy:

- this area is cleaner than before, but the layout still remains responsible for deciding when the script runs

## Theme Token Ownership

Relevant code:

- `src/shared/theme/theme.css`
- `src/shared/theme/themePreference.ts`
- `src/components/layout/Header/ThemeToggle/ThemeToggle.interfaces.ts`

Current state:

- `theme.css` defines the live CSS variable values used by the app
- `themePreference.ts` defines `ThemeName` plus the low-level theme read/write helpers
- `ThemeToggle.interfaces.ts` imports `ThemeName` from `themePreference.ts`

Current conclusion:

- `theme.css` is the active runtime theme source of truth
- TypeScript no longer contains parallel runtime token value sets
- the remaining TypeScript theme layer exists only for theme naming and low-level preference helpers

## Summary

The current layout and theme design is structurally sound:

- one root shell
- one global theme attribute
- CSS-owned theme values
- pre-hydration theme bootstrap in the layout
- post-hydration theme UI and selection state in the shared header

The main issues are not correctness problems. The remaining concerns are footer social extraction in the layout and the inline placement of the bootstrap script.
