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

### 3. Extract a dedicated theme hook

- Current state: theme read/subscribe/toggle logic is implemented directly in `src/components/layout/Header/Header.tsx`.
- Why it matters: theme behavior is conceptually one small external-store system, but its logic is still embedded in the shell component.
- Possible improvement: introduce a dedicated hook such as `useThemePreference` to own `getStoredTheme()`, `subscribeToTheme()`, and toggle behavior.
- Risk level: Low
- Priority: Medium

### 4. Decide which theme token layer is authoritative

- Current state: `src/shared/theme/tokens.ts` defines a typed token contract and token sets, while `src/shared/theme/theme.css` provides the live CSS variable values. `src/shared/theme/applyThemeTokens.ts` is present but unused at runtime. `ThemeName` from `tokens.ts` is still used for typing in `src/components/layout/Header/ThemeToggle/ThemeToggle.interfaces.ts`.
- Why it matters: duplicate token values create drift risk and make ownership unclear.
- Possible improvement: either make CSS the explicit source of truth and trim unused runtime helpers, or wire the TypeScript token layer into actual runtime variable application.
- Risk level: Medium
- Priority: Medium

### 5. Reduce client surface area on project detail pages

- Current state: `src/app/projects/[slug]/page.tsx` is static-friendly, but `src/views/ProjectDetailPage/ProjectDetailPage.tsx` is fully client-side because reveal logic is embedded in the page view.
- Why it matters: the page hydrates more UI than its content model requires.
- Possible improvement: keep the content rendering server-first and move reveal behavior into a smaller client-only enhancer if the complexity is justified.
- Risk level: Medium
- Priority: Medium

### 6. Unify section navigation paths

- Current state: header links use the landing-page store and explicit offset-aware scrolling, while hero action links in `src/views/LandingPage/sections/HeroSection/HeroSection.tsx` call `scrollIntoView()` directly.
- Why it matters: there are two code paths for the same section-navigation concept.
- Possible improvement: route both header and hero section actions through one shared navigation helper or one shared section-navigation API.
- Risk level: Medium
- Priority: Medium

## Optional

### 7. Revisit `AppLink`

- Current state: `src/components/navigation/AppLink/AppLink.tsx` is marked `use client` but currently renders a plain anchor and does not itself use browser APIs.
- Why it matters: this is a small abstraction with a client boundary that may be broader than necessary.
- Possible improvement: either keep it as the standard app anchor wrapper with clear intent, or simplify/remove the client boundary if no longer needed.
- Risk level: Low
- Priority: Optional

### 8. Improve root metadata copy

- Current state: root metadata copy is currently minimal and static in `src/app/layout.tsx`.
- Why it matters: the root description is now production-oriented, but it may still need future SEO/content refinement as the site evolves.
- Possible improvement: revisit the description if homepage positioning or SEO goals change.
- Risk level: Low
- Priority: Optional

### 9. Revisit build-time footer year behavior

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
