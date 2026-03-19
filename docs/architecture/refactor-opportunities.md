# Refactor Opportunities

## Purpose

This document lists possible improvements separately from the current-state architecture docs.

These items describe potential future changes. They are not current architecture facts.

## High Priority

### 1. Reduce reveal-binder DOM coordination further only if the current explicit contract becomes a bottleneck

- Current state: homepage navigation and reveal are now decoupled. `src/shared/page-sections/useLandingPageNavigationController.ts` owns request consumption and scroll execution, `src/shared/page-sections/useLandingPageActiveSectionTracker.ts` owns scroll-based active-section tracking, `src/shared/page-sections/usePageSectionReveal.ts` owns viewport-driven reveal behavior, and `src/views/LandingPage/LandingPageRevealGate/LandingPageRevealGate.tsx` is a thin binder that resolves section elements and applies a simple post-hero reveal delay. The reveal gate still resolves section elements through the explicit DOM contract in `src/shared/page-sections/landingPageSections.ts`.
- Why it matters: the old navigation-driven reveal choreography is gone, but the reveal gate still depends on DOM resolution and remains the integration point for landing-page reveal setup.
- Possible improvement: if future changes justify it, move from explicit DOM resolution to explicit ref registration so the controller no longer needs to query the DOM at all.
- Risk level: Medium
- Priority: High

### 2. Make root layout data dependencies less label-driven

- Current state: `src/app/layout.tsx` still searches `portfolio.contact.socials` by label to derive footer props such as GitHub and LinkedIn URLs.
- Why it matters: shell logic depends on human-readable content labels rather than a footer-specific data shape.
- Possible improvement: expose footer-ready social data directly or pass the social list through more generically.
- Risk level: Low
- Priority: High

## Medium Priority

### 3. Reduce client surface area on project detail pages

- Current state: `src/app/projects/[slug]/page.tsx` is static-friendly, but `src/views/ProjectDetailPage/ProjectDetailPage.tsx` is fully client-side because reveal logic is embedded in the page view.
- Why it matters: the page hydrates more UI than its content model requires.
- Possible improvement: keep the content rendering server-first and move reveal behavior into a smaller client-only enhancer if the complexity is justified.
- Risk level: Medium
- Priority: Medium

### 4. Revisit whether pending target state should stay in the shared external snapshot

- Current state: homepage section navigation now keeps only transient request state, observational active state, and `pendingTargetSection` in `src/shared/page-sections/landingPageNavigationStore.ts`.
- Why it matters: the model is much simpler now, but the shared snapshot still combines request intent and UI-facing tracking state.
- Possible improvement: keep the current architecture unless future UX changes require a more explicit controller state again.
- Risk level: Medium
- Priority: Medium

## Optional

### 5. Revisit `AppLink`

- Current state: `src/components/navigation/AppLink/AppLink.tsx` is marked `use client` but currently renders a plain anchor and does not itself use browser APIs.
- Why it matters: this is a small abstraction with a client boundary that may be broader than necessary.
- Possible improvement: either keep it as the standard app anchor wrapper with clear intent, or simplify/remove the client boundary if no longer needed.
- Risk level: Low
- Priority: Optional

### 6. Improve root metadata copy

- Current state: root metadata copy is currently minimal and static in `src/app/layout.tsx`.
- Why it matters: the root description is now production-oriented, but it may still need future SEO/content refinement as the site evolves.
- Possible improvement: revisit the description if homepage positioning or SEO goals change.
- Risk level: Low
- Priority: Optional

### 7. Revisit build-time footer year behavior

- Current state: `src/components/layout/Footer/Footer.tsx` computes the year during render. On a static deployment, that year stays fixed until the site is rebuilt.
- Why it matters: the displayed year can go stale on long-lived deployments.
- Possible improvement: accept the rebuild-based update model, or move the year to a browser-calculated value if freshness without deploys matters.
- Risk level: Low
- Priority: Optional

## Things to Leave Alone for Now

These areas currently have clear value and should not be changed without a specific reason:

- thin route files in `src/app` that delegate into `src/views`
- the split between route-sized `views` and reusable `components`
- `HeaderNavList` as a presentational extraction
- route-level project lookup and metadata generation in `src/app/projects/[slug]/page.tsx`
- the overall static-first rendering model

## Summary

The current codebase does not need a broad refactor to function well. The most meaningful improvements are about reducing ambiguity:

- keep homepage navigation and reveal ownership explicit and narrow
- keep shell-level architecture simple and explicit
- clarify source-of-truth ownership for theme logic and tokens
