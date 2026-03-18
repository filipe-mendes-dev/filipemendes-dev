# Header and Navigation

## Purpose

This document explains the current shared header, landing-page navigation flow, and section-scrolling behavior.

## Header Ownership

The shared header is implemented in `src/components/layout/Header/Header.tsx` and mounted by `src/app/layout.tsx`.

The header owns:

- primary navigation rendering
- current-item calculation for the shell
- theme toggle UI and updates
- mobile menu open/close state
- outside-click dismissal for the mobile menu
- sticky header height publishing through `--header-offset`

The header does not own:

- DOM lookup for homepage sections
- scroll tracking for the landing page
- reveal orchestration
- homepage section refs

Those responsibilities live in the landing-page navigation system.

## Navigation Inputs

Navigation content comes from `portfolio.navigation` in `src/data/portfolio.ts`.

Each item contains:

- `label`
- `href`
- optional `sectionId`

Relevant code:

- `src/data/portfolio.ts` → `NavigationItem`
- `src/components/layout/Header/Header.tsx` → `getNavigationHref()`, `getNavigationKey()`

Section items are currently:

- `home`
- `projects`
- `about`
- `contact`

## Current Item Logic

Relevant code:

- `src/components/layout/Header/Header.tsx` → `activeSection`
- `src/components/layout/Header/Header.tsx` → `isNavigationItemCurrent()`

Current rules:

- on `/`, the current item comes from the landing-page navigation store
- on `/projects/[slug]`, the `projects` item is treated as current
- for non-section links, pathname equality is used

This keeps the shell consistent when the user is inside a project detail page.

## The Landing-Page Navigation System

Navigation state is split across four key pieces:

- `src/components/layout/Header/Header.tsx` → initiates navigation requests
- `src/shared/page-sections/landingPageNavigationStore.ts` → stores `activeSection`, `requestedSection`, and `requestKey`
- `src/views/LandingPage/LandingPageRevealController/LandingPageRevealController.tsx` → binds the store to real DOM sections
- `src/shared/page-sections/useLandingPageSectionNavigation.ts` → performs section scrolling and active-section tracking

This division is the core navigation architecture for the homepage.

## Homepage Navigation Flow

### Step 1. Header requests a section

Relevant code:

- `Header.tsx` → `handleSectionNavigation()`
- `landingPageNavigationStore.ts` → `requestLandingPageSection()`

Current behavior on `/`:

1. A header link with `sectionId` is clicked.
2. `Header.tsx` calls `requestLandingPageSection(sectionId)`.
3. Because the current pathname is `/`, the header prevents default link navigation.

At this point the header has requested a section, but it has not scrolled the page itself.

### Step 2. Landing page controller receives the request

Relevant code:

- `LandingPageRevealController.tsx` → `useSyncExternalStore(...)`
- `LandingPageRevealController.tsx` → `useLandingPageSectionNavigation(...)`

Current behavior:

- the controller subscribes to the landing-page navigation store
- it resolves real DOM nodes for `home`, `projects`, `about`, and `contact`
- it passes those refs into `useLandingPageSectionNavigation()`

### Step 3. Scroll is performed with header offset

Relevant code:

- `useLandingPageSectionNavigation.ts` → `getHeaderOffset()`
- `useLandingPageSectionNavigation.ts` → `getSectionTargetTop()`
- `useLandingPageSectionNavigation.ts` → `scrollToSection()`

Current behavior:

- the target section’s top position is measured
- the current `--header-offset` value is subtracted
- scrolling uses `window.scrollTo({ top, behavior })`
- reduced-motion users get `behavior: 'auto'`

This is the explicit offset-aware navigation path used by the shared header on the homepage.

### Step 4. Active section is updated while scrolling

Relevant code:

- `useLandingPageSectionNavigation.ts` → `getTrackedSection()`
- `useLandingPageSectionNavigation.ts` → `syncActiveSection()`
- `landingPageNavigationStore.ts` → `setLandingPageActiveSection()`

Current behavior:

- scroll and resize events schedule active-section recalculation
- the current section is chosen from the ordered section list using an activation line
- the store updates `activeSection`
- the header re-renders with the new current item

## Project-Page Navigation Flow

The same header links behave differently when the current pathname starts with `/projects/`.

### Step 1. Header still records the section request

Relevant code:

- `Header.tsx` → `handleSectionNavigation()`
- `landingPageNavigationStore.ts` → `requestLandingPageSection()`

Current behavior:

- the store is updated with the requested landing-page section
- default link navigation is not prevented, because `pathname !== '/'`

### Step 2. Route navigation to `/#section` proceeds

Relevant code:

- `Header.tsx` → `getSectionHref()`

Current behavior:

- the link target remains `/#home`, `/#projects`, `/#about`, or `/#contact`
- the browser navigates back to the homepage route with a hash

### Step 3. Landing page syncs from hash and store

Relevant code:

- `LandingPageRevealController.tsx` → `syncLandingPageNavigationFromHash()`
- `landingPageNavigationStore.ts` → `syncLandingPageNavigationFromHash()`

Current behavior:

- on landing-page mount, the controller syncs navigation state from `window.location.hash`
- if the store already requested the same section, duplicate reset is avoided
- `useLandingPageSectionNavigation()` then performs the same offset-aware scroll path as on the homepage

## Header Offset Publishing

Relevant code:

- `Header.tsx` → `useLayoutEffect(...)`
- `Header.tsx` → `syncHeaderOffset()`

Current behavior:

- a `ResizeObserver` watches the header element
- the header writes its height into `document.documentElement.style.setProperty('--header-offset', ...)`

Consumers of this value:

- `src/shared/page-sections/useLandingPageSectionNavigation.ts` → explicit offset math
- `src/components/ui/PageSectionSurface/PageSectionSurface.module.css` → `scroll-margin-top: var(--header-offset, 4.5rem)`

This is a good ownership boundary: the shell publishes its own size, and scrolling/layout logic consumes that size elsewhere.

## Mobile Menu Behavior

Relevant code:

- `Header.tsx` → `isMobileMenuOpen`
- `Header.tsx` → `getMobileNavItemOnClick()`
- `Header.tsx` → document `pointerdown` effect

Current behavior:

- the menu button toggles `isMobileMenuOpen`
- clicking a mobile nav item closes the menu before handling navigation
- when open, the header listens for pointer events outside the header and mobile nav and closes the menu

This is local UI state and belongs in the header.

## `HeaderNavList`

Relevant code:

- `src/components/layout/Header/HeaderNavList/HeaderNavList.tsx`

Current role:

- render the list of nav items for both desktop and mobile
- apply `aria-current`
- accept per-item click handlers and optional styles

It does not own:

- route matching
- active-state rules
- scroll behavior
- theme behavior

That makes `HeaderNavList` a presentational extraction, not a navigation controller.

## Stagger Timing

Relevant code:

- `Header.tsx` → `getMobileNavItemStyle()`
- `Header.module.css` → mobile nav transition rules

Current behavior:

- mobile nav items receive inline `transitionDelay`
- the delay is derived from shared motion CSS variables
- CSS performs the actual opacity/transform animation

This is small, local, and appropriately placed in the header.

## Where Navigation Behavior Diverges

There are currently two section-navigation implementations.

### Header path

Relevant code:

- `Header.tsx`
- `landingPageNavigationStore.ts`
- `LandingPageRevealController.tsx`
- `useLandingPageSectionNavigation.ts`

Behavior:

- uses the store
- uses explicit header-offset math
- updates active section through scroll tracking

### Hero action path

Relevant code:

- `src/views/LandingPage/sections/HeroSection/HeroSection.tsx` → `handleSectionActionClick()`

Behavior:

- directly calls `sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' })`
- does not go through the landing-page navigation store

Why alignment still works:

- homepage sections use the shared `surface.section` class in `LandingPage.tsx`
- `PageSectionSurface.module.css` applies `scroll-margin-top: var(--header-offset, 4.5rem)` to `.section`

This means hero actions still benefit from CSS-level offset alignment, but they do not participate in the same explicit JS scroll orchestration as the header path.

## Complexity Hotspot

The hardest part of the current navigation architecture is the interaction between:

- `Header.tsx`
- `landingPageNavigationStore.ts`
- `LandingPageRevealController.tsx`
- `useLandingPageSectionNavigation.ts`
- `usePageSectionReveal.ts`

Why it is complex:

- requested navigation and observed active state share one external store
- the landing page controller discovers DOM nodes indirectly by ID and data attributes
- navigation and reveal behavior are connected through the same section-level orchestration

The system is working, but this is the most behavior-dense part of the current app shell.

## Summary

The current navigation model is consistent once its boundaries are clear:

- the header requests section changes and renders shell state
- the landing-page controller owns DOM binding
- the shared hook owns offset-aware scrolling and active-section tracking
- the hero section is the one place that bypasses the store and scrolls directly

That division makes the behavior predictable, but only after understanding which module owns each step.
