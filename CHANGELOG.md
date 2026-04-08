# Changelog

All notable changes to this project will be documented in this file.

---

## Unreleased

### Added

- Added a branded email signature asset at `public/email/Signature.png` for future email-related use

### Changed

- Updated the Open Graph image to better match the website design
- Updated the public contact email to `contact@filipemendes.dev`
- Reworked the contact section so the primary email action copies the address with inline success and failure feedback

## [v1.0.0] - 2026-04-06

### Added

#### Core Platform

- Next.js App Router portfolio with landing, project, and documentation routes
- Section-based landing page (hero, projects, about, contact)
- Dedicated project routes for case study rendering

#### Project Showcase

- Arc Timer case study including overview, screenshots, feature highlights, and implementation details

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
