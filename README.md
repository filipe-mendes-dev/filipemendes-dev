# Filipe Mendes Portfolio

Next.js App Router portfolio covering landing pages, project detail pages, and a standalone documentation workspace.

## Overview

This repository powers a personal portfolio for Filipe Mendes, a frontend and mobile engineer. The site combines:

- a landing page with hero, projects, about, and contact sections
- dedicated project pages for selected case studies
- a docs workspace for delivery notes, project documentation, and reference material
- light and dark theme persistence through cookies and `localStorage`

Content is data-driven. Site copy, project records, project detail content, and docs entries live under `src/data`, then flow into thin route files and focused views.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript 5
- Framer Motion for interaction and reveal motion
- CSS Modules plus shared theme tokens and CSS custom properties

## Routes

- `/` landing page
- `/projects/[slug]` project detail pages
- `/docs` docs index
- `/docs/[docSlug]` standalone docs
- `/docs/projects/[projectSlug]` project docs index
- `/docs/projects/[projectSlug]/[docSlug]` project-scoped docs

## Architecture Notes

- `src/app` keeps route files thin and focused on metadata, params, and data handoff.
- `src/views` owns page-level composition.
- `src/components` contains reusable UI, docs, branding, navigation, and layout pieces.
- `src/data` stores portfolio content, project metadata, docs registry entries, and site copy.
- `src/shared/theme` centralizes theme tokens, motion values, and theme initialization.

The app defaults to Server Components. Client boundaries stay small and are used for motion, section tracking, theme interactions, and browser-only behavior.

## Local Development

### Prerequisites

- Node.js 22+
- npm 11+

### Install

```bash
npm install
```

### Start the development server

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

## Content Model

Projects are registered as modules under `src/data/projects`. Each module can expose:

- landing-card content
- project detail content
- docs content
- visibility flags for landing and demo behavior

The docs workspace is registry-driven. `src/data/docs/docs.registry.ts` builds navigation and document lookup from project modules, keeping project docs and standalone docs behind one API.

## Environment Toggle

Set `ENABLE_DOCS_DEMOS=true` to include development-only docs fixtures in the docs registry. Leave it unset in normal usage to keep demo content hidden.

## Verification

Before shipping changes, run:

```bash
npm run check
npm run build
```
