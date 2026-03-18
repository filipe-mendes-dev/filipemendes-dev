# Content Model

## Purpose

This document explains the current role of `src/data/portfolio.ts` and how content flows into the app shell, homepage, and project detail routes.

## Primary Content Source

The current site content is centralized in:

- `src/data/portfolio.ts`

This file exports:

- content interfaces such as `PortfolioContent`, `ProjectDetail`, and `NavigationItem`
- the `portfolio` object
- `getProjectSlugs()`
- `getProjectBySlug(slug)`

At the current scale, this file acts as both:

- the content source
- lightweight content-driven configuration

## What the File Contains

The current `portfolio` object includes:

- `siteTitle`
- `descriptor`
- `navigation`
- `hero`
- `projects`
- `about`
- `contact`

Each group is consumed by a different part of the app.

## Current Consumers by Content Area

### Site identity

Fields:

- `siteTitle`
- `descriptor`

Current consumers:

- `src/app/layout.tsx` → passes `siteTitle` to `Header`
- `src/app/layout.tsx` → passes `siteTitle` and `descriptor` to `Footer`
- `src/app/projects/[slug]/page.tsx` → uses `siteTitle` in `generateMetadata()`

### Navigation

Field:

- `navigation`

Current consumers:

- `src/app/layout.tsx` → passes `navigation` to `Header`

Why it acts as both content and config:

- labels are user-facing content
- `href` and `sectionId` also drive shell navigation behavior

### Hero content

Field:

- `hero`

Current consumers:

- `src/views/LandingPage/sections/HeroSection/HeroSection.tsx`

Contents include:

- display name
- role copy
- summary copy
- current status/location copy
- image URL, `srcSet`, `sizes`, and alt text
- hero action definitions

### Project collection

Field:

- `projects`

Current consumers:

- `src/views/LandingPage/sections/ProjectsSection/ProjectsSection.tsx` → renders project cards
- `src/app/projects/[slug]/page.tsx` → resolves a single project
- `src/views/ProjectDetailPage/ProjectDetailPage.tsx` → renders project details

Each project entry currently supports both:

- homepage summary presentation
- full project detail route rendering

### About content

Field:

- `about`

Current consumers:

- `src/views/LandingPage/sections/AboutSection/AboutSection.tsx`

Currently rendered from `about`:

- `profile`
- `experience`
- `education`
- `publications`

Current facts:

- `skills` exists in the content model but is not rendered by the current UI
- `principles` exists in the content model but is not rendered by the current UI

### Contact content

Field:

- `contact`

Current consumers:

- `src/views/LandingPage/sections/ContactSection/ContactSection.tsx`
- `src/app/layout.tsx` for footer social lookup

Currently rendered from `contact`:

- intro text
- email
- availability text
- social links

## Layout Consumption

Relevant code:

- `src/app/layout.tsx`

Current behavior:

- imports `portfolio` directly
- passes `portfolio.navigation` to `Header`
- passes `portfolio.siteTitle` and `portfolio.descriptor` to `Footer`
- searches `portfolio.contact.socials` for `GitHub` and `LinkedIn` labels to build footer props

This means the shared shell depends directly on the content model, not just on route views.

## Homepage Consumption

Relevant code:

- `src/views/LandingPage/LandingPage.tsx`

Current behavior:

- the landing page imports `portfolio`
- it binds that object once to `content`
- it passes `content` into homepage sections

Current section consumers:

- `HeroSection.tsx` → `content.hero`
- `ProjectsSection.tsx` → `content.projects`
- `AboutSection.tsx` → `content.about`
- `ContactSection.tsx` → `content.contact`

This is a simple page-level pass-through model and is appropriate for the current project size.

## Project Route Consumption

Relevant code:

- `src/app/projects/[slug]/page.tsx`

Current behavior:

- `generateStaticParams()` uses `getProjectSlugs()`
- `getProjectFromParams()` uses `getProjectBySlug(slug)`
- `generateMetadata()` uses the resolved project plus `portfolio.siteTitle`
- the route renders `ProjectDetailPage` with the resolved project

This keeps slug lookup, metadata generation, and page rendering aligned to the same content source.

## Project Slug Helpers

Relevant code:

- `src/data/portfolio.ts` → `getProjectSlugs()`
- `src/data/portfolio.ts` → `getProjectBySlug()`

Current behavior:

- `getProjectSlugs()` maps the project collection to slug strings
- `getProjectBySlug()` performs a simple in-memory lookup

This is intentionally simple because:

- the content is local
- the collection is small
- there is no pagination or external data source

## Why This Model Works Now

The current content model is a good fit because:

- the site is small
- all content is static
- the data shape is easy to understand in TypeScript
- route files and views can import content directly without async fetch complexity
- one project entry can support both summary and detail views

At the current scale, this is simpler than introducing a CMS or splitting content into many files.

## Current Tradeoffs

The file intentionally mixes content and lightweight configuration.

Examples:

- navigation is both content and shell routing input
- contact socials are both page content and shell footer input
- project entries serve both homepage cards and detail pages

These are acceptable tradeoffs for the current site size because they reduce duplication and keep the data model easy to audit.

## Summary

`src/data/portfolio.ts` is the content backbone of the application.

It currently works well because it provides:

- one typed content source
- one project collection for both list and detail pages
- simple route lookup helpers
- direct compatibility with the current static-first rendering model
