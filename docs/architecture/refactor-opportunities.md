# Refactor Opportunities

## Purpose

This document lists possible improvements separately from the current-state architecture docs.

These items describe potential future changes. They are not current architecture facts.

## High Priority

### 1. Reduce reveal-binder DOM coordination further only if the current explicit contract becomes a bottleneck

- Current state: homepage navigation and reveal are now decoupled. `src/views/LandingPage/navigation/useLandingPageNavigationController.ts` owns request consumption and scroll execution, `src/views/LandingPage/navigation/useLandingPageActiveSectionTracker.ts` owns scroll-based active-section tracking, `src/views/LandingPage/useLandingPageRevealEnabled/useLandingPageRevealEnabled.tsx` owns the post-hero reveal gate, and reveal-managed sections use `src/components/ui/Section/Section.tsx` with `src/shared/motion/useSectionRevealMotion.ts`.
- Why it matters: the old navigation-driven reveal choreography is gone, but reveal is still coordinated through a page-level enablement flag and shared section motion primitives.
- Possible improvement: keep the current model unless later UX requirements justify a more explicit page-level reveal controller again.
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

- Current state: each project route file under `src/app/projects/*/page.tsx` is thin and static-friendly, but the project page views under `src/views/ProjectPages/*Page.tsx` and the shared `src/views/ProjectPages/ProjectDetailPage/ProjectDetailPage.tsx` are client components because they compose Framer Motion sections and shared reveal behavior directly.
- Why it matters: the project-detail subtree hydrates more UI than the mostly static content requires.
- Possible improvement: only revisit this if project-detail pages need better static rendering characteristics or lower hydration cost. A worthwhile refactor would move reveal orchestration into a smaller client-only boundary while keeping the content composition server-first.
- Risk level: Medium
- Priority: Medium

### 4. Revisit whether pending target state should stay in the shared external snapshot

- Current state: homepage section navigation now keeps only transient request state, observational active state, and `pendingTargetSection` in `src/views/LandingPage/navigation/landingPageNavigationStore.ts`.
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
- explicit per-project route files in `src/app/projects/*/page.tsx` that only wire metadata and view exports
- the overall static-first rendering model

## Summary

The current codebase does not need a broad refactor to function well. The most meaningful improvements are about reducing ambiguity:

- keep homepage navigation and reveal ownership explicit and narrow
- keep shell-level architecture simple and explicit
- clarify source-of-truth ownership for theme logic and tokens
- only reduce project-page client boundaries if the measurable payoff becomes relevant
