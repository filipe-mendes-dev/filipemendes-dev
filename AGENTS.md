# AGENTS.md — Website Starter Project Rules

You are working in a frontend web project. Follow these rules strictly.

## 1) Communication and workflow

-   Prefer clarity and correctness over speed.
-   Keep changes small and scoped to the request.
-   Respond file-by-file.
-   If no changes are needed for a recently changed relevant file, respond exactly:
    -   `no changes to the <file_name>`

## 2) TypeScript rules

-   Never use `any`.
-   Prefer `unknown` plus narrowing when needed.
-   Prefer interfaces over type aliases unless there is a concrete reason.
-   For optional props/fields, use `prop?: T` only. Do not use `prop?: T | undefined`.
-   Enable strict type checking and keep it passing.
-   Do not weaken strict compiler settings to make code pass.
-   Fix types instead of bypassing them.
-   Keep public function inputs/outputs explicitly typed.

## 3) React and UI rules

-   Prefer arrow functions.
-   Keep components focused and composable.
-   Avoid hard-coded magic numbers and duplicated constants.
-   Support long text and small screens without layout breaks.
-   Keep all user-facing strings ready for i18n.

## 4) Styling rules

-   Prefer design tokens (colors, spacing, typography) over raw values.
-   Avoid one-off inline style values when a reusable token/class is appropriate.
-   Keep accessibility contrast and focus states explicit.
-   Prefer mobile-first CSS (base for small screens, then `@media (min-width: ...)` enhancements).
-   Ensure layouts remain usable at 320px width.
-   Do not rely on hover-only interactions for critical behavior.

## 5) State and data fetching

-   Keep state minimal; derive values instead of duplicating state.
-   Place server-state in dedicated query/cache tools when available.
-   Avoid expensive computation in render paths.

## 6) Quality gates

-   Preferred gate: run `check` then `build` as the canonical verification chain.
-   Required checks before finalizing:
    -   `check`
    -   `build`
-   If tests are present, also run:
    -   `test`
-   Do not skip failing checks silently.

## 7) Framework and tools

-   Framework: Vite + React + TypeScript (SPA).
-   Package manager: npm.
-   Styling: CSS/CSS Modules by default.
-   Linting: ESLint flat config with `typescript-eslint`.
-   Formatting: ESLint-only via `eslint . --fix`.
-   Tests and CI are optional and not enabled by default.

## 8) Git and commits

-   Use Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`, `docs:`, `test:`).
-   Keep commit messages specific and imperative.

## 9) Safety and scope

-   Do not modify unrelated logic.
-   Prefer built-in tooling first; add packages only when needed.
-   Never add a new tool category (formatter, test runner, CI engine) unless explicitly requested in the decision block.
-   Do not add dependencies without clear justification.
-   If a broader refactor is needed, call it out explicitly before doing it.

## 10) Component structure conventions

-   For non-trivial components (~40+ lines, meaningful props/types, meaningful styling, or reused components), use folder structure:
    -   `ComponentName/index.ts`
    -   `ComponentName/ComponentName.tsx`
    -   `ComponentName/ComponentName.interfaces.ts`
    -   `ComponentName/ComponentName.module.css` (when using CSS/CSS Modules)
-   Keep `*.interfaces.ts` for props/interfaces and local types only.
-   Keep `index.ts` as the public export surface.
-   Avoid exporting component internals by default.

## 10a) Page structure conventions

-   Route pages must also live in folder-based structure under `src/pages`.
-   Use:
    -   `PageName/index.ts`
    -   `PageName/PageName.tsx`
    -   `PageName/PageName.interfaces.ts` (when page has props or local page-only types)
    -   `PageName/PageName.module.css`
-   Keep page-specific styling inside the page module CSS file.
-   Do not place page layout classes in global CSS.

## 11) Theme and typography boundary

-   Keep a typed token source in `src/shared/theme/tokens.ts`.
-   Prefer centralized motion tokens/config for shared interaction and animation behavior.
-   Avoid duplicating semantically related motion values across component and page files; derive them from one source of truth when they represent the same behavior.
-   Mirror tokens into CSS custom properties (`:root { --... }`) through bootstrap wiring (`src/shared/theme/applyThemeTokens.ts`).
-   Do not hardcode raw colors or typography sizes in components.
-   Prefer semantic typography primitives for shared UI when adding new reusable components.
-   Add future themes by toggling a theme class (example: `.theme-dark`) without rewriting component code.

## 12) Global CSS scope rules

-   `src/shared/theme/theme.css` may contain: font imports and theme CSS variables only.
-   `src/shared/styles/reset.css` may contain: reset and normalization rules only.
-   `src/shared/styles/base.css` may contain: base element defaults (`html`, `body`, typography elements, links, focus-visible, reduced-motion).
-   Global CSS must not contain component/page layout classes (`.hero`, `.card`, `.footer`, `.projects-list`, etc).
-   Global CSS must not contain feature-specific selectors or deep descendant chains tied to app sections.

## 13) CSS Modules ownership rules

-   Component and page styling belongs in co-located `*.module.css` files.
-   Reusable visual utilities belong in shared module files (for example, `src/shared/styles/utilities.module.css`).
-   Component modules must use CSS variables from the theme layer (`var(--token-name)`), not raw values for core tokens.
-   Prefer local class names like `root`, `title`, `actions`, `meta`; avoid global naming semantics inside modules.
-   Every `*.module.css` file must include a `root` class.
-   Top-level JSX for each component/page should apply its module `root` class.
-   Do not use raw hex colors in component/page CSS Modules; define values in theme tokens and consume via `var(--...)`.
-   Do not hardcode font sizes in component/page CSS Modules; use typography tokens.

## 14) Style import rules (Vite and Next)

-   Vite: import `src/shared/theme/theme.css`, `src/shared/styles/reset.css`, and `src/shared/styles/base.css` once in `src/main.tsx`.
-   Next.js: import equivalent global style entry once from `app/layout.tsx` (or via `app/globals.css`).
-   Do not import global style files inside leaf components.
