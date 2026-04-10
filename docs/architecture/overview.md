# Architecture Overview

## Purpose

This document describes the current structure of the portfolio website and the ownership boundaries between routes, views, reusable components, shared modules and static content.

## Framework Context

The current application is a Next.js App Router site.

Primary entry points:

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/projects/*/page.tsx`
- `src/app/not-found.tsx`

The codebase is organized as a mostly static site with request-aware theme rendering and client-side enhancements for navigation state, scrolling and motion.

## Layer Responsibilities

### `src/app`

`src/app` owns Next.js route conventions and framework-facing behavior.

Current responsibility:

- define route entry files required by App Router
- define the root layout shell
- read request cookies needed for root document rendering
- define route metadata
- define route-level not-found behavior

Key files:

- `src/app/layout.tsx` → root shell, global CSS imports, cookie-backed theme bootstrap, shared header/footer
- `src/app/fonts.ts` → shared `next/font` definitions for app-wide typography variables
- `src/app/page.tsx` → homepage route entry
- `src/app/projects/*/page.tsx` → explicit project route entries and metadata wiring
- `src/app/not-found.tsx` → App Router not-found entry

What `src/app` does not own:

- detailed page composition
- reusable UI primitives
- cross-page stores and hooks
- site content

### `src/views`

`src/views` owns route-sized UI composition.

Current top-level views:

- `src/views/LandingPage`
- `src/views/ProjectDetailPage`
- `src/views/NotFoundPage`

Current responsibility:

- build full page UI from route data and reusable components
- keep route files thin
- keep route-specific sections local to the page that uses them

Examples:

- `src/views/LandingPage/LandingPage.tsx` → homepage composition and section order
- `src/views/ProjectDetailPage/ProjectDetailPage.tsx` → project detail page composition
- `src/views/NotFoundPage/NotFoundPage.tsx` → visual not-found page

What `src/views` does not own:

- framework route conventions
- site-wide shell mounting
- global theme tokens
- canonical content storage

### `src/components`

`src/components` owns reusable UI and app-shell pieces.

Current groups:

- `src/components/layout`
- `src/components/navigation`
- `src/components/ui`
- `src/components/icons`

Current responsibility:

- shared shell components such as `Header` and `Footer`
- reusable layout primitives such as `Container`, `Section` and `PageSectionSurface`
- reusable navigation helpers such as `HeaderNavList`
- reusable visual wrappers such as `SoftSurface`
- icons and small shared presentation helpers

Examples:

- `src/components/layout/Header/Header.tsx` → shared shell header
- `src/components/layout/Footer/Footer.tsx` → shared shell footer
- `src/components/ui/Section/Section.tsx` → shared section wrapper with optional header

What `src/components` does not own:

- route selection
- page-specific content decisions
- top-level project data

### `src/shared`

`src/shared` owns cross-cutting modules that are not themselves route-sized UI.

Current groups:

- `src/shared/navigation`
- `src/shared/motion`
- `src/shared/styles`
- `src/shared/theme`

Current responsibility:

- shared section ID definitions in `src/shared/navigation/sections.ts`
- shared reveal primitives in `src/shared/motion`
- theme tokens and motion configuration in `src/shared/theme`
- global styles and shared CSS utilities in `src/shared/styles`

What `src/shared` does not own:

- route file wiring
- full page composition
- the shared shell itself
- the actual content model

### `src/data`

`src/data` owns static site content and lightweight content-driven configuration.

Current file:

- `src/data/portfolio.ts`

Current responsibility:

- site identity
- navigation items
- hero content
- project collection
- about content
- contact content

What `src/data` does not own:

- route matching
- metadata assembly logic
- animation behavior
- shell state

## How the Layers Connect

Current flow:

1. A route file in `src/app` handles framework requirements.
2. The route renders or re-exports a page-sized view from `src/views`.
3. The view composes reusable pieces from `src/components`.
4. Shared behavior is supplied by `src/shared`.
5. Static content is read from `src/data/portfolio.ts`.

Example: homepage

- `src/app/page.tsx` re-exports `src/views/LandingPage/LandingPage.tsx`
- `LandingPage.tsx` imports `portfolio` from `src/data/portfolio.ts`
- `LandingPage.tsx` renders local sections under `src/views/LandingPage/sections` and declares the landing-page section roots inline
- `LandingPage.tsx` mounts the landing-page navigation binder and computes a reveal-enabled flag for lower sections
- those sections use reusable UI from `src/components`
- section navigation behavior comes from `src/views/LandingPage/navigation/useLandingPageNavigationController.ts` and `src/views/LandingPage/navigation/useLandingPageActiveSectionTracker.ts`, backed by a minimal store with request intent, active section and pending target state
- reveal behavior comes from `src/components/ui/Section/Section.tsx` and `src/shared/motion/useSectionRevealMotion.ts` and is driven by viewport visibility rather than navigation intent

Example: project detail page

- `src/app/projects/atlas-mobile/page.tsx` is representative of the current pattern
- the route file exports metadata and renders a dedicated project page view from `src/views/ProjectPages`
- the project view composes the shared `ProjectDetailPage` shell plus project-specific sections and data

## Route Files vs Views

The current split is intentional.

Route files own:

- Next.js conventions
- param handling
- metadata
- not-found control

Views own:

- page composition
- section ordering
- page-specific visual structure

This keeps route code small and keeps framework concerns out of most UI files.

## Conceptual Model

The current site is best understood as:

- one shared app shell
- one local typed content source
- route-sized views for page composition
- a small set of client-only interaction systems layered over static output

That model is consistent across the homepage, project detail pages and not-found UI.
