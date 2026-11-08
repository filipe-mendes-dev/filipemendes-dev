# Changelog

All notable changes to this project will be documented in this file.

---

## Unreleased

## [v1.1.0] - 2026-11-08

### Added

- Added a branded email signature asset at `public/email/Signature.png` for future email-related use
- Added a canonical `/curriculum-vitae` route with a print-ready CV document view featuring Arc Timer and Benchline Stats project entries
- Added a dedicated `filipemendes.dev` project page with branded logo assets, refined project copy and website screenshots
- Added a Benchline Stats homepage entry and project page with desktop and mobile screenshots, app and GitHub links, feature descriptions and implementation details
- Added CV writing guidelines covering recruiter readability, technical accuracy and keyword selection, linked from `AGENTS.md`

### Changed

- Restructured App Router metadata so route-specific SEO lives in dedicated `metadata.ts` files with shared page metadata builders and explicit not-found metadata handling
- Updated the Open Graph image to better match the website design
- Updated the public contact email to `contact@filipemendes.dev`
- Reworked the contact section so the primary email action copies the address with inline success and failure feedback
- Centralized person, contact, hero, CV and metadata consumers around shared profile data
- Updated shared project galleries to serve responsive optimized images and scale enlarged screenshots to the available viewport
- Updated Arc Timer support information to display app version `1.2.0`

### Fixed

- Fixed theme initialization to avoid hydration mismatch on first paint
- Fixed theme synchronization so returning to a tab or switching between tabs applies the current theme consistently

## [v1.0.0] - 2026-04-06

### Added

#### Core Platform

- Next.js App Router portfolio with landing, project and documentation routes
- Section-based landing page (hero, projects, about, contact)
- Dedicated project routes for case study rendering

#### Project Showcase

- Arc Timer case study including overview, screenshots, feature highlights and implementation details

#### Documentation System

- Project-scoped documentation workspace
- Docs navigation supporting project and standalone documentation routes
- Demo documentation fixtures gated behind `ENABLE_DOCS_DEMOS`

#### SEO & Metadata

- Centralized metadata system (titles, Open Graph, Twitter cards)
- Generated routes for:
  - `opengraph-image`
  - `twitter-image`
  - `robots.txt`
  - `sitemap.xml`

#### Theming & UI Foundations

- Theme persistence using cookies and `localStorage`
- Shared theme tokens and motion configuration
- CSS variable-driven styling system
