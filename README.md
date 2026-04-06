<h1 align="center">Filipe Mendes Portfolio</h1>

<p align="center">
  Next.js App Router portfolio covering landing pages, project case studies, and a standalone documentation workspace.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript 5" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-000000?logo=framer&logoColor=white" alt="Framer Motion 12" />
  <img src="https://img.shields.io/badge/npm-11-CB3837?logo=npm&logoColor=white" alt="npm 11" />
</p>

## Contents

- [Overview](#overview)
- [Highlights](#highlights)
- [Stack](#stack)
- [Route Surface](#route-surface)
- [Project Structure](#project-structure)
- [Local Development](#local-development)
- [Scripts](#scripts)
- [Content and Docs Model](#content-and-docs-model)
- [Environment Toggle](#environment-toggle)
- [Verification](#verification)

## Overview

This repository powers a personal portfolio for Filipe Mendes, a frontend and mobile engineer. The site combines a section-based landing page, dedicated project pages, and a docs workspace for project notes and reference material.

Content is data-driven. Site copy, project records, project detail content, and docs entries live under `src/data`, then flow into thin route files and focused views.

## Highlights

- Landing page with hero, projects, about, and contact sections
- Dedicated project routes for portfolio case studies
- Standalone docs workspace separated from the main site shell
- Theme persistence through cookies and `localStorage`
- Shared theme tokens, motion tokens, and CSS variable-driven styling
- Server-first rendering with narrow client boundaries for motion and browser state

## Stack

- Next.js 16 App Router
- React 19
- TypeScript 5
- Framer Motion
- CSS Modules
- Shared theme tokens and CSS custom properties

## Route Surface

- `/` landing page
- `/projects/[slug]` project detail pages
- `/docs` docs index
- `/docs/[docSlug]` standalone docs
- `/docs/projects/[projectSlug]` project docs index
- `/docs/projects/[projectSlug]/[docSlug]` project-scoped docs

## Project Structure

```text
src/
  app/         App Router routes, metadata, and layout entry points
  views/       Page-level composition
  components/  Reusable UI, layout, branding, navigation, and docs components
  data/        Site copy, project modules, docs registry, and static content
  shared/      Theme, motion, styles, and shared navigation utilities
```

Architecture boundaries:

- `src/app` handles params, metadata, and view handoff
- `src/views` owns page composition
- `src/components` holds reusable building blocks
- `src/data` stores deterministic content
- `src/shared/theme` centralizes theme initialization and motion values

The app defaults to Server Components. Client components are limited to motion, section tracking, theme interactions, and browser-only behavior.

## Local Development

Prerequisites:

- Node.js 22+
- npm 11+

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` start the local development server
- `npm run build` build the production app
- `npm run start` run the production build locally
- `npm run lint` run ESLint
- `npm run typecheck` run TypeScript without emitting files
- `npm run tokens:check` validate theme token usage
- `npm run check` run token checks, lint, and type checking
- `npm run format` apply ESLint auto-fixes

## Content and Docs Model

Projects are registered as modules under `src/data/projects`. Each module can expose:

- landing card content
- project detail content
- docs content
- visibility flags for landing and demo behavior

The docs workspace is registry-driven. `src/data/docs/docs.registry.ts` builds navigation and document lookup from project modules, keeping project docs and standalone docs behind one API.

## Environment Toggle

Set `ENABLE_DOCS_DEMOS=true` to include development-only docs fixtures in the docs registry. Leave it unset to keep demo content hidden.

## Verification

Run both commands before shipping changes:

```bash
npm run check
npm run build
```
