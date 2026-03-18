# Rendering Model

## Purpose

This document describes how the current site renders across build time, route execution, and browser hydration.

## Current Model

The current portfolio is static-first.

- Route content comes from local TypeScript data in `src/data/portfolio.ts`.
- The homepage is rendered from static content only.
- Project detail pages are generated from a fixed slug list in `src/app/projects/[slug]/page.tsx`.
- Client components are used for interaction and motion, not for data loading.

## Route-Level Rendering Facts

### Homepage

Route entry:

- `src/app/page.tsx`

Current behavior:

- the route file simply re-exports `src/views/LandingPage/LandingPage.tsx`
- no dynamic route params are involved
- no request-bound API is used

Result:

- the homepage is statically generated in production

### Project detail pages

Route entry:

- `src/app/projects/[slug]/page.tsx`

Current behavior:

- `generateStaticParams()` builds one route per project slug
- `dynamicParams = false` disables unknown runtime slugs
- `generateMetadata()` derives page metadata from the resolved project
- `getProjectFromParams()` resolves the slug and calls `notFound()` when no project matches

Result:

- known project pages are statically generated
- unknown project slugs are not treated as dynamic fallback pages

### Not-found route

Route entry:

- `src/app/not-found.tsx`

Current behavior:

- it re-exports `src/views/NotFoundPage/NotFoundPage.tsx`

Result:

- not-found UI has no data-fetch dependency

## Server components by default

These files are server components because they do not declare `use client`:

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/projects/[slug]/page.tsx`
- `src/app/not-found.tsx`
- `src/views/LandingPage/LandingPage.tsx`
- `src/views/NotFoundPage/NotFoundPage.tsx`
- most reusable UI wrappers such as `Section`, `Container`, `PageSectionSurface`, and `SoftSurface`

Why they can stay server-side:

- they do not read browser APIs
- they do not hold interactive local state
- they do not register effects or observers

## Explicit client components

The current explicit client entry files are:

- `src/components/layout/Header/Header.tsx`
- `src/views/LandingPage/LandingPageRevealController/LandingPageRevealController.tsx`
- `src/views/LandingPage/sections/HeroSection/HeroSection.tsx`
- `src/views/ProjectDetailPage/ProjectDetailPage.tsx`
- `src/components/navigation/AppLink/AppLink.tsx`

## Why each current client component is client

### `src/components/layout/Header/Header.tsx`

Why it is client:

- uses `usePathname()`
- uses `useState`, `useEffect`, `useLayoutEffect`, and `useSyncExternalStore`
- reads and writes `document.documentElement`
- uses `ResizeObserver`
- registers document-level pointer listeners

Could it be server instead:

- no, not in its current role, because it owns interactive shell behavior

### `src/views/LandingPage/LandingPageRevealController/LandingPageRevealController.tsx`

Why it is client:

- uses `useSyncExternalStore`
- queries DOM nodes by section ID
- uses `MutationObserver`
- runs scroll/reveal hooks that depend on browser APIs

Could it be server instead:

- no, not in its current role, because it is purely a browser coordination layer

### `src/views/LandingPage/sections/HeroSection/HeroSection.tsx`

Why it is client:

- uses Framer Motion
- uses `useReducedMotion`, `useState`, and `useEffect`
- handles direct section scrolling on hero actions
- exposes the hero intro completion flag through a DOM data attribute

Could it be server instead:

- not without moving the intro animation and action behavior elsewhere

### `src/views/ProjectDetailPage/ProjectDetailPage.tsx`

Why it is client:

- uses `usePageSectionReveal()`
- stores section/header/content refs through callbacks
- relies on browser-side reveal orchestration

Could it be server instead:

- partially, yes; the page content itself is static-friendly, but the current reveal implementation keeps the view on the client

### `src/components/navigation/AppLink/AppLink.tsx`

Why it is client:

- current file declares `use client`
- accepts an `onClick` handler prop for client-side use cases

Could it be server instead:

- yes, potentially; the current implementation renders a plain anchor and does not itself use browser APIs

## What Happens at Build Time

During production build:

- Next.js evaluates route files in `src/app`
- `src/app/layout.tsx` is compiled as the root shell
- `src/data/portfolio.ts` is imported as the content source
- `src/app/projects/[slug]/page.tsx` runs `generateStaticParams()`
- project metadata is prepared by `generateMetadata()`
- static HTML is generated for `/` and each known project slug

There is no remote data dependency in the current build path.

## What Happens in the Browser

After the initial HTML is delivered:

- the theme bootstrap script in `src/app/layout.tsx` sets `data-theme`
- `Header.tsx` hydrates and subscribes to theme and landing-page navigation state
- `LandingPageRevealController.tsx` hydrates and connects store state to real section DOM nodes
- `HeroSection.tsx` hydrates and runs the intro motion sequence
- `ProjectDetailPage.tsx` hydrates and activates reveal behavior for project sections

Browser-only responsibilities therefore include:

- theme persistence and theme toggling
- mobile menu interaction
- header height measurement
- active-section tracking
- section scrolling orchestration
- reveal orchestration
- hero intro motion

## Hydration Behavior

### Theme hydration

Relevant code:

- `src/app/layout.tsx` → `themeInitializationScript`
- `src/shared/theme/useThemePreference.ts` → `getStoredTheme()`, `subscribeToTheme()`, `setThemePreference()`
- `src/components/layout/Header/Header.tsx` → `useThemePreference()`
- `src/shared/theme/theme.css` → live theme variable definitions

Current behavior:

- the server renders without user-specific localStorage knowledge
- a `beforeInteractive` script sets `data-theme` before hydration
- `theme.css` supplies the actual light and dark variable sets selected by `data-theme`
- `<html suppressHydrationWarning>` is used because the DOM may differ from the server snapshot by the time React hydrates

### Navigation hydration

Relevant code:

- `src/shared/page-sections/landingPageNavigationStore.ts`
- `src/views/LandingPage/LandingPageRevealController/LandingPageRevealController.tsx`
- `src/components/layout/Header/Header.tsx`

Current behavior:

- the server snapshot for landing-page navigation starts at `home`
- the client later syncs from the hash and scroll position
- the header then renders the client-correct active section

### Motion hydration

Relevant code:

- `src/views/LandingPage/sections/HeroSection/HeroSection.tsx`
- `src/shared/page-sections/usePageSectionReveal.ts`

Current behavior:

- hero intro and reveal state are browser-derived
- initial HTML is present before those client behaviors run
- the visible timing and reveal state become accurate only after hydration and effects run

## Concrete Hydration Risks

### Confirmed current risks

- Theme mismatch without the bootstrap script: the server cannot know `localStorage`, so `src/app/layout.tsx` must set `data-theme` early.
- Active-nav mismatch on first paint: `landingPageNavigationStore.ts` starts from a default `home` snapshot and is corrected later in the browser.
- Larger-than-necessary hydrated subtree on project detail pages: `ProjectDetailPage.tsx` is fully client-side because reveal logic is inside the page view.

### Assumption — needs verification

Reduced-motion first paint on the hero should be verified in a real browser. `HeroSection.tsx` initializes `isReducedMotionEnabled` from Framer Motion’s `useReducedMotion()` and falls back to `false` with `?? false`, so the exact first client render for reduced-motion users depends on Framer Motion’s hook behavior at hydration time.

## Summary

The current rendering model is:

- static at the route/content level
- server-component-first by default
- client-enhanced for shell interaction, scrolling, and motion

That model is coherent. The main rendering tradeoff is not data loading, but how much interactive behavior currently expands the client-side subtree.
