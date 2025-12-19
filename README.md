# PM AI Lab

Where AI Fails Product Managers - an educational platform helping PMs and Designers understand AI limitations through real data and practical challenges.

## Overview

PM AI Lab analyzed 14,208 AI-generated questions and found 29.1% fail basic quality standards. This platform helps product professionals learn to work effectively with AI by understanding where it fails.

**Live site**: [pmailab.chaiwithjai.com](https://pmailab.chaiwithjai.com)

## Features

- **AI Failure Challenges**: 12 categorized challenges showing where AI commonly fails PMs
- **Action Guides**: Time-based learning paths (Today, This Week, This Month, This Quarter, Long Game)
- **Case Studies**: Real examples of AI agent development and lessons learned
- **D&D/Tarot System**: Gamified challenge archetypes for engagement

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Testing**: Vitest + Testing Library + Playwright
- **CI/CD**: GitHub Actions + Netlify
- **Type Safety**: TypeScript

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view.

## Development

### Available Scripts

| Script                  | Description                               |
| ----------------------- | ----------------------------------------- |
| `npm run dev`           | Start development server                  |
| `npm run build`         | Build for production                      |
| `npm run lint`          | Run ESLint                                |
| `npm run format`        | Format code with Prettier                 |
| `npm run type-check`    | TypeScript type checking                  |
| `npm run test`          | Run tests in watch mode                   |
| `npm run test:run`      | Run tests once                            |
| `npm run test:coverage` | Run tests with coverage                   |
| `npm run test:e2e`      | Run Playwright E2E tests                  |
| `npm run test:visual`   | Run visual regression tests               |
| `npm run validate`      | Run all checks (lint + type-check + test) |

### Testing Strategy

Following the Testing Trophy approach:

```
        E2E (10%)           - Playwright critical paths
    Integration (40%)       - Component + data flow
      Unit (30%)           - Pure functions, data validation
  Static Analysis (20%)    - TypeScript, ESLint, Prettier
```

### Pre-commit Hooks

Husky runs on every commit:

- ESLint + Prettier on staged files
- Commit message validation (conventional commits)

## Release Process

We use Shape Up methodology with semantic versioning:

### Version Format

```
MAJOR.MINOR.PATCH
  |      |     |
  |      |     +-- Bug fixes, content updates
  |      +-------- New features, challenges added
  +--------------- Breaking changes, redesigns
```

### Creating a Release

```bash
# Tag the release
git tag v1.0.0

# Push tag to trigger release workflow
git push origin v1.0.0
```

## Project Structure

```
pm-ai-lab/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── challenges/      # Challenge browser
│   │   ├── do/[timeframe]/  # Action guides
│   │   ├── case-study/      # Case studies
│   │   └── story/           # Jai's story
│   ├── components/          # React components
│   └── data/                # Data stores
│       ├── challenges.ts    # Challenge definitions
│       ├── action-guides.ts # Time-based guides
│       └── case-studies.ts  # Case study content
├── __tests__/               # Test files
│   ├── unit/                # Unit tests
│   ├── integration/         # Component tests
│   └── e2e/                 # E2E + visual tests
├── public/                  # Static assets
└── .github/workflows/       # CI/CD pipelines
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT

## Author

Built by [Chai with Jai](https://chaiwithjai.com)
