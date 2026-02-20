# AGENTS.md — Website Starter Project Rules

You are working in a frontend web project. Follow these rules strictly.

## 1) Communication and workflow

- Prefer clarity and correctness over speed.
- Keep changes small and scoped to the request.
- Respond file-by-file.
- If no changes are needed for a file, respond exactly:
  - `no changes to the <file_name>`

## 2) TypeScript rules

- Never use `any`.
- Prefer `unknown` plus narrowing when needed.
- Prefer interfaces over type aliases unless there is a concrete reason.
- Enable strict type checking and keep it passing.
- Do not weaken strict compiler settings to make code pass.
- Fix types instead of bypassing them.
- Keep public function inputs/outputs explicitly typed.

## 3) React and UI rules

- Prefer arrow functions.
- Keep components focused and composable.
- Avoid hard-coded magic numbers and duplicated constants.
- Support long text and small screens without layout breaks.
- Keep all user-facing strings ready for i18n.

## 4) Styling rules

- Prefer design tokens (colors, spacing, typography) over raw values.
- Avoid one-off inline style values when a reusable token/class is appropriate.
- Keep accessibility contrast and focus states explicit.

## 5) State and data fetching

- Keep state minimal; derive values instead of duplicating state.
- Place server-state in dedicated query/cache tools when available.
- Avoid expensive computation in render paths.

## 6) Quality gates

- Preferred gate: run `check` then `build` as the canonical verification chain.
- Required checks before finalizing:
  - `check`
  - `build`
- If tests are present, also run:
  - `test`
- Do not skip failing checks silently.

## 7) Framework and tools

- Framework: Vite + React + TypeScript (SPA).
- Package manager: npm.
- Styling: CSS/CSS Modules by default.
- Linting: ESLint flat config with `typescript-eslint`.
- Formatting: ESLint-only via `eslint . --fix`.
- Tests and CI are optional and not enabled by default.

## 8) Git and commits

- Use Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`, `docs:`, `test:`).
- Keep commit messages specific and imperative.

## 9) Safety and scope

- Do not modify unrelated logic.
- Prefer built-in tooling first; add packages only when needed.
- Never add a new tool category (formatter, test runner, CI engine) unless explicitly requested in the decision block.
- Do not add dependencies without clear justification.
- If a broader refactor is needed, call it out explicitly before doing it.
