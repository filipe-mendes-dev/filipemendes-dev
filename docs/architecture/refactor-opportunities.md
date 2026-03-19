# Refactor Opportunities

## Purpose

This document lists possible improvements separately from the current-state architecture docs.

These items describe potential future changes. They are not current architecture facts.

## High Priority

### 1. Make landing-page navigation and reveal contracts more explicit

- Current state: homepage navigation behavior is split across `src/components/layout/Header/Header.tsx`, `src/shared/page-sections/landingPageNavigationStore.ts`, `src/views/LandingPage/LandingPageRevealController/LandingPageRevealController.tsx`, `src/shared/page-sections/useLandingPageSectionNavigation.ts`, and `src/shared/page-sections/usePageSectionReveal.ts`. The controller binds to DOM nodes by section ID and reveal-related data attributes.
- Why it matters: this is the most behavior-dense part of the codebase and the easiest part to break when changing homepage structure.
- Possible improvement: replace implicit DOM discovery with more explicit section/ref wiring, or formalize the contract with stronger inline documentation and narrower helper APIs.
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

### 4. Separate landing-page request state from observational UI state more explicitly

- Current state: homepage section navigation now uses one canonical store/controller path, but `src/shared/page-sections/landingPageNavigationStore.ts` still holds both transient request state and observational active state in the same external snapshot.
- Why it matters: the behavior is simpler than before, but the store still carries two different responsibilities.
- Possible improvement: keep the current canonical path, but consider splitting request intent and active-section observation into narrower APIs if future changes make the boundary harder to reason about.
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

- make homepage navigation/reveal behavior easier to reason about
- keep shell-level architecture simple and explicit
- clarify source-of-truth ownership for theme logic and tokens
