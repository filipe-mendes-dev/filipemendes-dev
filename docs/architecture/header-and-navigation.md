# Header and Navigation

## Purpose

This document explains the current shared header, landing-page navigation flow and section-scrolling behavior.

## Header Ownership

The shared header is implemented in `src/components/layout/Header/Header.tsx` and mounted by `src/app/layout.tsx`.

`Header.tsx` now stays mostly presentational and delegates shell behavior into `src/components/layout/Header/useHeaderController.ts`.

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
- `src/components/layout/Header/useHeaderController.ts` → nav item preparation

Section items are currently:

- `home`
- `projects`
- `about`
- `contact`

## Current Item Logic

Relevant code:

- `src/components/layout/Header/useHeaderController.ts` → `activeSection`
- `src/components/layout/Header/useHeaderController.ts` → current-item mapping

Current rules:

- on `/`, the current item comes from the landing-page navigation store
- on `/projects/[slug]`, the `projects` item is treated as current
- for non-section links, pathname equality is used

This keeps the shell consistent when the user is inside a project detail page.

## The Landing-Page Navigation System

Navigation state is split across four key pieces:

- `src/views/LandingPage/LandingPage.tsx` → declares the landing-page section contract in markup
- `src/views/LandingPage/navigation/LandingPageNavigationBinder.tsx` → subscribes to the landing-page navigation store and mounts the navigation controller
- `src/components/layout/Header/useHeaderController.ts` → initiates navigation requests and prepares header nav items
- `src/views/LandingPage/navigation/landingPageNavigationStore.ts` → stores `activeSection`, transient `requestedSection` and optional `pendingTargetSection`
- `src/views/LandingPage/navigation/landingPageSections.ts` → defines the section-resolution contract and shared section attributes
- `src/views/LandingPage/navigation/landingPageScroll.ts` → owns target measurement, arrival checks and scroll execution
- `src/views/LandingPage/useLandingPageRevealEnabled/useLandingPageRevealEnabled.tsx` → enables landing-page section reveal after the hero intro delay
- `src/views/LandingPage/navigation/useLandingPageNavigationController.ts` → consumes requests, performs scroll and sets `pendingTargetSection` when smooth-scroll pinning is needed
- `src/views/LandingPage/navigation/useLandingPageActiveSectionTracker.ts` → tracks active section during normal scroll and pins the target while `pendingTargetSection` is active
- `src/components/ui/Section/Section.tsx` and `src/shared/motion/useSectionRevealMotion.ts` → own viewport-driven section reveal behavior

This division is the core navigation architecture for the homepage.

Important model rules:

- homepage section navigation is fully app-controlled
- URL hash is not part of homepage section navigation
- `requestedSection` is transient request state
- `activeSection` is observational UI state derived from scroll behavior
- `pendingTargetSection` is the only extra runtime state needed to support simple smooth-scroll pinning
- reveal is viewport-driven and does not depend on navigation requests, progress, or phases
- hero intro only gates whether later section reveal is enabled

## Homepage Navigation Flow

### Step 1. Header requests a section

Relevant code:

- `useHeaderController.ts` → `handleSectionNavigation()`
- `landingPageNavigationStore.ts` → `requestLandingPageSection()`

Current behavior on `/`:

1. A header link with `sectionId` is clicked.
2. `useHeaderController.ts` calls `requestLandingPageSection(sectionId)`.
3. Because the current pathname is `/`, the header prevents default link navigation and leaves the URL unchanged.

At this point the header has requested a section, but it has not scrolled the page itself.

### Step 2. Landing-page navigation binder receives the request

Relevant code:

- `LandingPageNavigationBinder.tsx` → `useSyncExternalStore(...)`
- `LandingPageNavigationBinder.tsx` → `useLandingPageNavigationController(...)`

Current behavior:

- the navigation binder subscribes to the landing-page navigation store
- `LandingPage.tsx` marks section roots inline with explicit landing-page section attributes
- the navigation controller consumes `requestedSection`
- the active-section tracker separately watches scroll and resize
- `useLandingPageRevealEnabled()` separately enables later section reveal after a delay derived from the hero intro motion config
- reveal is applied by each reveal-managed `Section` through shared motion variants
- navigation and reveal are now wired separately; neither binder mounts the other system

### Step 3. Scroll is performed with header offset

Relevant code:

- `src/views/LandingPage/navigation/landingPageScroll.ts` → `getHeaderOffset()`
- `src/views/LandingPage/navigation/landingPageScroll.ts` → `getSectionTargetTop()`
- `src/views/LandingPage/navigation/landingPageScroll.ts` → `scrollToTop()`
- `src/views/LandingPage/navigation/useLandingPageNavigationController.ts`

Current behavior:

- the target section’s top position is measured
- the current `--header-offset` value is subtracted
- a scroll command is created from the measurement and desired behavior
- scrolling uses `window.scrollTo({ top, behavior })`
- reduced-motion users get `behavior: 'auto'`
- once the request has been consumed by the navigation controller, `requestedSection` is cleared from shared state

This is the explicit offset-aware navigation path used by the shared header on the homepage.

### Step 4. Active section is updated while scrolling

Relevant code:

- `src/views/LandingPage/navigation/useLandingPageActiveSectionTracker.ts`
- `landingPageNavigationStore.ts` → `setLandingPageActiveSection()`

Current behavior:

- scroll and resize events schedule active-section recalculation
- the current section is chosen from the ordered section list using an activation line
- if `pendingTargetSection` exists, the tracker keeps the requested target pinned until arrival
- once arrival is detected, the tracker clears `pendingTargetSection`
- the store updates `activeSection`
- the header re-renders with the new current item

`activeSection` is not the request source of truth. It remains the UI-facing state that reflects the current scroll result.

### Step 5. Reveal happens from visibility, not navigation intent

Relevant code:

- `useLandingPageRevealEnabled.tsx` → reveal gate timeout
- `Section.tsx` → `useInView(...)`
- `useSectionRevealMotion.ts` → shared reveal motion variants and viewport config

Current behavior:

- reveal-managed sections reveal when they enter view
- the same reveal logic applies to manual scroll, wheel/touch scroll, smooth programmatic scroll and cross-page return-to-section flows
- reveal timing lives in shared motion variants rather than in navigation-driven choreography
- no navigation-driven reveal choreography remains

This keeps navigation focused on scroll mechanics, reveal focused on visibility-driven appearance and hero intro as a separate readiness gate.

## Project-Page Navigation Flow

The same header links behave differently when the current pathname starts with `/projects/`.

### Step 1. Header records the section request

Relevant code:

- `useHeaderController.ts` → `handleSectionNavigation()`
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

- `LandingPageNavigationBinder.tsx` → `useLandingPageNavigationController(...)`
- `landingPageNavigationStore.ts` → `clearLandingPageSectionRequest()`

Current behavior:

- on landing-page mount, the navigation binder reads the pending request from shared state
- `useLandingPageNavigationController()` performs the same offset-aware scroll path as on the homepage
- once that request is accepted, it is cleared so later visits to `/` do not inherit stale section intent

## Header Offset Publishing

Relevant code:

- `useHeaderController.ts` → header offset `useLayoutEffect(...)`

Current behavior:

- a `ResizeObserver` watches the header element
- the header writes its height into `document.documentElement.style.setProperty('--header-offset', ...)`

Consumers of this value:

- `src/views/LandingPage/navigation/landingPageScroll.ts` → explicit offset math
- `src/components/ui/PageSectionSurface/PageSectionSurface.module.css` → `scroll-margin-top: var(--header-offset, 4.5rem)`

The canonical homepage section-navigation path uses the explicit offset math in `landingPageScroll.ts`.

## Mobile Menu Behavior

Relevant code:

- `useHeaderController.ts` → `isMobileMenuOpen`
- `useHeaderController.ts` → prepared mobile nav items
- `useHeaderController.ts` → document `pointerdown` effect

Current behavior:

- the menu button toggles `isMobileMenuOpen`
- clicking a mobile nav item closes the menu before handling navigation
- when open, the header listens for pointer events outside the header and mobile nav and closes the menu

This is local UI state and belongs in the header.

## `HeaderNavList`

Relevant code:

- `src/components/layout/Header/HeaderNavList/HeaderNavList.tsx`

Current role:

- render precomputed nav items for both desktop and mobile
- apply `aria-current`
- accept already-prepared hrefs, click handlers and optional styles

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

This is small, local and appropriately placed in the header.

## Where Navigation Behavior Diverges

Homepage section navigation now has one canonical implementation.

### Canonical path

Relevant code:

- `Header.tsx`
- `landingPageNavigationStore.ts`
- `LandingPageNavigationBinder.tsx`
- `useLandingPageNavigationController.ts`
- `useLandingPageActiveSectionTracker.ts`

Behavior:

- uses the store
- uses explicit header-offset math
- uses `pendingTargetSection` as the only extra state needed for smooth-scroll pinning
- updates active section through a dedicated scroll tracker

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
- `LandingPageNavigationBinder.tsx`
- `useLandingPageRevealEnabled.tsx`
- `useLandingPageNavigationController.ts`
- `useLandingPageActiveSectionTracker.ts`
- `Section.tsx`
- `useSectionRevealMotion.ts`

Why it is complex:

- requested navigation, pending target state and observed active state share one external store snapshot
- landing-page section resolution still depends on DOM attributes, but that contract is now centralized in `landingPageSections.ts`
- navigation and reveal are separate, but both still depend on the same section-level DOM contract

The system is working, but this is the most behavior-dense part of the current app shell.

## Summary

The current navigation model is consistent once its boundaries are clear:

- `LandingPage.tsx` owns which sections participate and exposes the section-root markers inline
- each landing-page section owns the heading/content markers for its own reveal DOM
- the header requests section changes and renders shell state
- `landingPageSections.ts` owns how section roots, headings and reveal content are identified
- the landing-page navigation binder mounts one request consumer and one tracker
- the navigation controller owns request consumption and offset-aware scrolling
- the active-section tracker owns normal scroll tracking and pending-target pinning
- the hero section now uses the same request path as the header
- URL hash is not part of homepage section navigation

That division keeps homepage section navigation app-controlled and consistent across homepage and project-page entry points.
