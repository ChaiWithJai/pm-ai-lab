# Contributing to PM AI Lab

Thank you for your interest in contributing to PM AI Lab!

## Development Workflow

We follow a Shape Up-inspired workflow adapted for solo/small team development.

### Getting Started

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Create a feature branch: `git checkout -b feat/your-feature`
4. Make your changes
5. Run validation: `npm run validate`
6. Commit with conventional commits
7. Push and create a pull request

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting, no code change
- `refactor`: Code change without feature/fix
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

**Examples:**

```
feat(challenges): add new pricing strategy challenge
fix(carousel): correct scroll behavior on mobile
docs(readme): update deployment instructions
test(action-guides): add navigation chain validation
```

### Branch Naming

```
feat/short-description    # New features
fix/issue-description     # Bug fixes
docs/what-changed         # Documentation
chore/maintenance-task    # Maintenance
```

## Testing Requirements

### Before Submitting

Run the full validation suite:

```bash
npm run validate
```

This runs:

1. ESLint
2. TypeScript type checking
3. Unit and integration tests

### Test Coverage

- **Data changes**: Add/update unit tests
- **Component changes**: Add/update integration tests
- **New pages**: Add E2E navigation tests
- **UI changes**: Update visual snapshots

### Running Tests

```bash
# Unit + integration tests
npm run test:run

# E2E tests (requires dev server)
npm run test:e2e

# Visual regression tests
npm run test:visual

# Update visual snapshots
npx playwright test --update-snapshots
```

## Code Style

### TypeScript

- Use explicit types for exports
- Prefer interfaces over types for objects
- Use `const` assertions for literal types

### React Components

- Functional components with hooks
- Props interfaces above component definition
- Tailwind CSS for styling

### Data Files

Data files in `src/data/` should:

- Export typed arrays/objects
- Include validation in tests
- Follow existing patterns

## Pull Request Process

1. **Title**: Use conventional commit format
2. **Description**: Explain what and why
3. **Tests**: Ensure all tests pass
4. **Review**: Wait for approval

### PR Template

```markdown
## Summary

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] Refactor

## Testing

- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] E2E tests pass (if applicable)
- [ ] Visual tests updated (if UI changes)

## Screenshots (if UI changes)
```

## Shape Up Labels

We use GitHub labels for Shape Up workflow:

| Label      | Description                       |
| ---------- | --------------------------------- |
| `pitch`    | Shape Up pitch for betting table  |
| `bet`      | Accepted bet for current cycle    |
| `cooldown` | Bug fix or tech debt for cooldown |
| `shaping`  | Needs more shaping before betting |

## Questions?

Open an issue or reach out on Twitter [@chaiwithjai](https://twitter.com/chaiwithjai).
