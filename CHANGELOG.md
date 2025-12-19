# Changelog

All notable changes to PM AI Lab will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2024-12-19

### Added

- **Core Platform**
  - Homepage with Crown Jewel Hero design
  - Challenge Carousel component with D&D/Tarot theming
  - Challenge browser page with 12 AI failure challenges
  - Action guides system (Today, This Week, This Month, This Quarter, Long Game)
  - Case study pages
  - Jai's story page

- **Data Layer**
  - 12 categorized AI failure challenges
  - 5 time-horizon action guides with step-by-step instructions
  - D&D/Tarot archetype system for challenge cards
  - 8 hidden eval principles (eval, constraint, iteration, specificity, tradeoff, humility, system, embodiment)

- **Testing Infrastructure**
  - Unit tests for data integrity validation
  - Integration tests for component rendering
  - E2E tests for navigation flows
  - Visual regression testing with Playwright
  - 158 total tests

- **CI/CD Pipeline**
  - GitHub Actions for CI (lint, type-check, test, build)
  - GitHub Actions for release (tag-triggered Netlify deploy)
  - Pre-commit hooks with Husky
  - Conventional commits with Commitlint

- **SEO & Performance**
  - Enhanced metadata with Open Graph and Twitter cards
  - Dynamic sitemap generation
  - AI crawler-friendly robots.txt
  - Security headers in Netlify config

- **Developer Experience**
  - Vitest for fast unit/integration testing
  - Playwright for E2E and visual testing
  - Prettier for code formatting
  - TypeScript strict mode
  - Path aliases (@/)

### Technical Details

- Framework: Next.js 15 (App Router)
- Styling: Tailwind CSS
- Node.js: 20
- Testing: Vitest + Testing Library + Playwright
- Deployment: Netlify with Next.js Runtime

---

[Unreleased]: https://github.com/ChaiWithJai/pm-ai-lab/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/ChaiWithJai/pm-ai-lab/releases/tag/v1.0.0
