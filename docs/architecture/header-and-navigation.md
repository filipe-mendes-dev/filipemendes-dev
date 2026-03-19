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

- `src/views/LandingPage/LandingPage.tsx` → declares the landing-page section contract in markup
- `src/components/layout/Header/Header.tsx` → initiates navigation requests
- `src/shared/page-sections/landingPageNavigationStore.ts` → stores `activeSection`, transient `requestedSection`, and `requestKey`
- `src/shared/page-sections/landingPageSections.ts` → defines the section-resolution contract and shared section attributes
- `src/views/LandingPage/LandingPageRevealController/LandingPageRevealController.tsx` → binds the store to real DOM sections
- `src/shared/page-sections/useLandingPageSectionNavigation.ts` → performs section scrolling and active-section tracking

This division is the core navigation architecture for the homepage.

Important model rules:

- homepage section navigation is fully app-controlled
- URL hash is not part of homepage section navigation
- `requestedSection` is transient request state
- `activeSection` is observational UI state derived from scroll behavior

## Homepage Navigation Flow

### Step 1. Header requests a section

Relevant code:

- `Header.tsx` → `handleSectionNavigation()`
- `landingPageNavigationStore.ts` → `requestLandingPageSection()`

Current behavior on `/`:

1. A header link with `sectionId` is clicked.
2. `Header.tsx` calls `requestLandingPageSection(sectionId)`.
3. Because the current pathname is `/`, the header prevents default link navigation and leaves the URL unchanged.

At this point the header has requested a section, but it has not scrolled the page itself.

### Step 2. Landing page controller receives the request

Relevant code:

- `LandingPageRevealController.tsx` → `useSyncExternalStore(...)`
- `LandingPageRevealController.tsx` → `useLandingPageSectionNavigation(...)`

Current behavior:

- the controller subscribes to the landing-page navigation store
- `LandingPage.tsx` marks section roots inline with explicit landing-page section attributes
- each landing-page section component receives its own `sectionId` and applies the matching heading/content attributes to the real reveal nodes
- `landingPageSections.ts` owns the selectors and section capabilities for `home`, `projects`, `about`, and `contact`
- the controller resolves real DOM nodes through `resolveLandingPageSectionElements()`
- it passes those refs and the pending request into `useLandingPageSectionNavigation()`

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
- once the request has been consumed by the landing-page hook, `requestedSection` is cleared from shared state

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

`activeSection` is not the request source of truth. It remains the UI-facing state that reflects the current scroll result.

## Project-Page Navigation Flow

The same header links behave differently when the current pathname starts with `/projects/`.

### Step 1. Header records the section request

Relevant code:

- `Header.tsx` → `handleSectionNavigation()`
- `landingPageNavigationStore.ts` → `requestLandingPageSection()`

Current behavior:

- the store is updated with the requested landing-page section
- default link navigation is not prevented, because `pathname !== '/'`
- section links navigate to `/`, not `/#section`

### Step 2. Route navigation to `/` proceeds

Relevant code:

- `Header.tsx` → `getSectionHref()`

Current behavior:

- the link target is `/`
- the browser navigates back to the homepage route without a hash

### Step 3. Landing page consumes the pending request

Relevant code:

- `LandingPageRevealController.tsx` → `useLandingPageSectionNavigation(...)`
- `landingPageNavigationStore.ts` → `clearLandingPageSectionRequest()`

Current behavior:

- on landing-page mount, the controller reads the pending request from shared state
- `useLandingPageSectionNavigation()` performs the same offset-aware scroll path as on the homepage
- once that request is accepted, it is cleared so later visits to `/` do not inherit stale section intent

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

The canonical homepage section-navigation path uses the explicit offset math in `useLandingPageSectionNavigation.ts`.

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

Homepage section navigation now has one canonical implementation.

### Canonical path

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

- calls `requestLandingPageSection(sectionId)`
- prevents default link navigation on the homepage
- uses the same store-driven landing-page scroll path as the header

## Complexity Hotspot

The hardest part of the current navigation architecture is the interaction between:

- `Header.tsx`
- `landingPageNavigationStore.ts`
- `LandingPageRevealController.tsx`
- `useLandingPageSectionNavigation.ts`
- `usePageSectionReveal.ts`

Why it is complex:

- requested navigation and observed active state share one external store snapshot, even though they now have clearer roles
- landing-page section resolution still depends on DOM attributes, but that contract is now centralized in `landingPageSections.ts`
- navigation and reveal behavior are connected through the same section-level orchestration

The system is working, but this is the most behavior-dense part of the current app shell.

## Summary

The current navigation model is consistent once its boundaries are clear:

- `LandingPage.tsx` owns which sections participate and exposes the section-root markers inline
- each landing-page section owns the heading/content markers for its own reveal DOM
- the header requests section changes and renders shell state
- `landingPageSections.ts` owns how section roots, headings, and reveal content are identified
- the landing-page controller owns DOM binding
- the shared hook owns offset-aware scrolling and active-section tracking
- the hero section now uses the same request path as the header
- URL hash is not part of homepage section navigation

That division keeps homepage section navigation app-controlled and consistent across homepage and project-page entry points.
