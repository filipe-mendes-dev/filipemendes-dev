# AGENTS.md — Project Rules

You are working in a Next.js App Router frontend project.

Follow these rules strictly.

## 1) Workflow

- Keep changes small and scoped to the request.
- Respond file-by-file.
- Do not rewrite entire files unless explicitly requested.
- If no changes are needed for a relevant file, respond exactly:
  - `no changes to the <file_name>`

## 2) Safety and scope

- Do not modify unrelated logic.
- Do not introduce new dependencies without clear justification.
- If a broader refactor is needed, call it out explicitly before doing it.

## 3) TypeScript rules

- Never use `any`.
- Prefer `unknown` plus narrowing when needed.
- Prefer interfaces over type aliases unless there is a concrete reason.
- For optional props/fields, use `prop?: T` only. Do not use `prop?: T | undefined`.
- Keep public function inputs/outputs explicitly typed.
- Do not weaken strict typing to make code pass.

## 4) React and UI rules

- Prefer arrow functions.
- Keep components focused and composable.
- Keep components easy to scan. A developer should be able to open a component and quickly understand what it renders.
- If a component becomes long because of behavioral logic, state wiring, browser effects, or view-model preparation, move that logic into a dedicated hook or helper with a clear responsibility.
- Avoid hard-coded magic numbers and duplicated constants.
- Support long text and small screens without layout breaks.
- Prefer direct optional prop passing over conditional object spreads in JSX when the prop type allows it.
- Avoid helper functions that only return trivial prop/attribute bags for JSX; prefer explicit attributes when there are only a few values.
- Prefer passing prepared render data to child components over passing many adapter callbacks.
- Avoid indirection that does not improve readability. Inline one-use helpers unless they name an important concept.

## 5) Styling and responsiveness rules

- Prefer mobile-first CSS (base styles first, then `@media (min-width: ...)` enhancements).
- Ensure layouts remain usable at 320px width.
- Keep focus states explicit and accessible.
- Do not rely on hover-only interactions for critical behavior.
- Avoid one-off inline style values when a reusable token/class is appropriate.

## 6) Framework and routing

- Framework: Next.js App Router + React + TypeScript.
- Routing lives in `src/app`.
- Route files must remain thin.

Route files may:

- handle params
- handle metadata
- import views
- pass data

Route files must NOT:

- contain page UI composition
- contain styling
- contain layout logic

## 7) Layout responsibility

`layout.tsx` owns:

- `html` / `body`
- global styles
- shared shell (`Header`, `Footer`)
- theme bootstrap logic

`layout.tsx` must NOT:

- contain route-specific UI
- contain page-specific logic
- duplicate logic from views

## 8) Server vs Client Component rules

- Default to Server Components.
- Only add `"use client"` when strictly necessary.

Use Client Components only for:

- state (`useState`)
- effects (`useEffect`)
- browser APIs (`window`, `document`, `localStorage`)
- event handlers

Never:

- import server-only code into client components
- move static or deterministic data access to the client
- convert large trees to client components without reason

Keep client boundaries small.

## 9) View vs Component ownership

- `src/views`

  - page-level composition
  - orchestration of sections
  - route-level UI structure

- `src/components`
  - reusable UI pieces
  - isolated behavior
  - no page-level orchestration

Route files in `src/app` must import views, not compose page UI directly.

## 10) Data and rendering boundaries

- Static content (for example `portfolio.ts`) should be consumed in Server Components whenever possible.
- Prefer passing data down via props.
- Do not duplicate deterministic data access across server and client.
- Do not add `suppressHydrationWarning` just to silence hydration issues. Fix the actual server/client mismatch instead.

## 11) Component structure conventions

For non-trivial components, use folder structure:

- `ComponentName/index.ts`
- `ComponentName/ComponentName.tsx`
- `ComponentName/ComponentName.interfaces.ts`
- `ComponentName/ComponentName.module.css`

Rules:

- keep `*.interfaces.ts` for props/interfaces and local types only
- keep `index.ts` as the public export surface
- avoid exporting internals by default

## 12) View structure conventions

Views in `src/views` should also follow folder-based structure where appropriate:

- `ViewName/index.ts`
- `ViewName/ViewName.tsx`
- `ViewName/ViewName.interfaces.ts` (if needed)
- `ViewName/ViewName.module.css`

Homepage sections nested under a view should use section-oriented naming, not route-oriented naming.

## 13) Styling constraints

- Use design tokens and CSS variables (`var(--...)`) for core values.
- Do not use raw hex colors in component/view CSS Modules.
- Do not hardcode typography values in component/view CSS Modules.
- Prefer CSS Modules for component and view styling.

## 14) Global CSS scope

Global CSS is limited to:

- theme variables
- reset/normalization
- base element rules

Global CSS must NOT contain:

- component styling
- page/view layout styling
- feature-specific selectors

## 15) CSS Modules ownership rules

- Every `*.module.css` file must include a `root` class.
- Top-level JSX for each component/view should apply its module `root` class.
- Reusable visual utilities may live in shared module files such as:
  - `src/shared/styles/utilities.module.css`

## 16) Theme and motion boundaries

- Keep typed theme tokens in `src/shared/theme/tokens.ts`.
- Prefer centralized motion tokens/config for shared motion behavior.
- Avoid duplicating semantically related motion values across files.
- Theme values should flow through CSS custom properties.

## 17) Verification

Before finalizing changes, run:

- `check`
- `build`

If tests are present, also run:

- `test`

Do not ignore failing checks.

## 18) Git and commits

- Use Conventional Commits:

  - `feat:`
  - `fix:`
  - `refactor:`
  - `chore:`
  - `docs:`
  - `test:`

- Keep commit messages specific and imperative.
