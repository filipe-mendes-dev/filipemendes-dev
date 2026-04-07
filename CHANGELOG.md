# Changelog

All notable changes to this project will be documented in this file.

---

## Unreleased

### Changed

- Updated the Open Graph image to better match the website design
- Added baseline security headers for transport enforcement, framing protection, referrer control, opener isolation, MIME sniffing prevention, and disabled unused browser permissions

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
