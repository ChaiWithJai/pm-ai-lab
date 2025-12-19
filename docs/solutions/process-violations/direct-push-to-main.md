---
# CORA-Compatible Failure Mode Documentation
# Designed for ReAct agent consumption and LangSmith evaluation tracking

title: 'Direct Push to Main Branch Violation'
slug: direct-push-to-main
category: process-violations
subcategory: git-workflow

# Semantic Labels for Agent Consumption
labels:
  primary: git-workflow-violation
  secondary:
    - shape-up-violation
    - production-safety
    - code-review-bypass
    - ci-cd-bypass
  severity: critical
  frequency: common
  preventability: high

# Evaluation Dimensions (0-100 scale for LangSmith tracking)
semantic_evaluations:
  impact_score: 85 # High - bypasses all safety checks
  detection_difficulty: 10 # Easy - immediately visible in git log
  recovery_difficulty: 40 # Medium - requires revert or force push
  prevention_ease: 95 # Very easy - just use branches
  recurrence_risk: 70 # High if not automated

# Composite Scores
composite:
  overall_severity: 75 # (impact * 0.4 + recovery * 0.3 + recurrence * 0.3)
  automation_priority: 90 # Should be prevented by automation
  documentation_value: 85 # High value for team learning

# Groupings for Pattern Recognition
groupings:
  root_cause_category: process_discipline
  failure_type: workflow_violation
  affected_systems:
    - git
    - ci-cd
    - code-review
    - deployment
  triggered_by:
    - time_pressure
    - context_loss
    - habit_override
    - missing_guard_rails

# Detection Signals (for ReAct agent pattern matching)
detection_signals:
  git_patterns:
    - 'git push origin main'
    - 'git push -u origin main'
  conversation_patterns:
    - 'let me push to'
    - 'pushing to main'
    - 'commit and push'
  missing_patterns:
    - 'git checkout -b'
    - 'gh pr create'
    - 'feature branch'

# Prevention Rules (for agent guardrails)
prevention_rules:
  - rule: 'NEVER push directly to main/master'
    enforcement: block
    alternatives:
      - 'Create feature branch: git checkout -b feat/description'
      - 'Push feature branch: git push -u origin feat/description'
      - 'Create PR: gh pr create'
  - rule: 'All changes require PR review'
    enforcement: warn
    exceptions:
      - 'hotfix with explicit user approval'
      - 'documentation-only changes (with approval)'

# LangSmith Evaluation Metadata
langsmith:
  experiment_name: 'git-workflow-compliance'
  evaluator_type: 'binary'
  success_criteria:
    - 'feature_branch_created'
    - 'pr_opened'
    - 'no_direct_main_push'
  failure_indicators:
    - 'direct_main_push'
    - 'no_pr_created'
    - 'review_bypassed'

created_at: 2024-12-19
updated_at: 2024-12-19
author: claude-opus-4-5
session_context: pm-ai-lab-tarot-feature
---

# Direct Push to Main Branch Violation

## Problem Statement

**Symptom**: Code was pushed directly to `main` branch, bypassing feature branch workflow and pull request review process.

**Impact**:

- Bypassed CI/CD validation pipeline
- No code review opportunity
- No PR discussion or approval record
- Violated Shape Up methodology
- Risk of breaking production

## Failure Analysis

### What Happened

```
Incorrect workflow executed:
1. Made changes on main branch
2. Committed directly to main
3. Pushed to origin/main
4. No PR, no review, no validation gate
```

### Root Cause Analysis

| Factor             | Weight | Description                                 |
| ------------------ | ------ | ------------------------------------------- |
| Context loss       | 35%    | Session continuation lost branch context    |
| Habit override     | 25%    | Default behavior overrode process knowledge |
| Missing automation | 25%    | No branch protection rules enforced         |
| Time pressure      | 15%    | Rushed to complete feature                  |

### Detection Timeline

```
T+0:   Changes committed to main (violation occurs)
T+1:   Push to origin/main (violation propagates)
T+2:   User identifies violation
T+3:   Documentation begins (this file)
```

## Correct Workflow

### Shape Up + First Principles Git Workflow

```bash
# 1. Create feature branch from main
git checkout main
git pull origin main
git checkout -b feat/tarot-card-ui

# 2. Make changes, commit with conventional commits
git add .
git commit -m "feat(tarot): add tarot card ui with flip animation"

# 3. Push feature branch (NEVER main directly)
git push -u origin feat/tarot-card-ui

# 4. Create PR for review
gh pr create --title "feat(tarot): add tarot card ui" --body "..."

# 5. After approval, merge via PR (not local merge)
gh pr merge --squash

# 6. Clean up
git checkout main
git pull origin main
git branch -d feat/tarot-card-ui
```

### Branch Naming Convention

```
feat/[scope]-[description]     # New features
fix/[scope]-[description]      # Bug fixes
docs/[description]             # Documentation
chore/[description]            # Maintenance
refactor/[scope]-[description] # Refactoring
```

## Prevention Strategies

### 1. Git Hooks (Pre-Push)

```bash
#!/bin/bash
# .husky/pre-push

branch=$(git rev-parse --abbrev-ref HEAD)

if [ "$branch" = "main" ] || [ "$branch" = "master" ]; then
  echo "ERROR: Direct push to $branch is not allowed."
  echo "Create a feature branch: git checkout -b feat/your-feature"
  exit 1
fi
```

### 2. GitHub Branch Protection

```yaml
# Settings > Branches > Branch protection rules
main:
  require_pull_request_reviews: true
  required_approving_review_count: 1
  dismiss_stale_reviews: true
  require_status_checks: true
  required_status_checks:
    - 'validate'
    - 'build'
  restrict_pushes: true
  allow_force_pushes: false
```

### 3. Agent Guardrail Check

Before any git push operation, the agent should verify:

```python
# Pseudo-code for ReAct agent guardrail
def pre_push_check(command: str, context: dict) -> tuple[bool, str]:
    """
    Returns (allowed, reason)
    """
    # Parse the git push command
    if "push" in command and ("main" in command or "master" in command):
        # Check if it's a direct push to main
        if "origin main" in command or "origin master" in command:
            return (False, "BLOCKED: Direct push to main. Use feature branch workflow.")

    return (True, "OK")
```

### 4. Session Context Preservation

When session context is lost:

1. Check `git branch` before any operations
2. If on main, create feature branch first
3. Never assume previous branch state

## Recovery Steps

If direct push to main has occurred:

```bash
# Option 1: Revert (if not yet deployed)
git revert HEAD
git push origin main

# Option 2: Create PR retroactively (for documentation)
# The damage is done, but document it

# Option 3: Force push (DANGEROUS - only if absolutely necessary)
# Requires explicit user approval
git reset --hard HEAD~1
git push --force origin main  # NEVER do this without approval
```

## Semantic Evaluation Rubric

For LangSmith tracking, evaluate each git workflow session:

| Dimension        | Score 0-25       | Score 26-50      | Score 51-75           | Score 76-100           |
| ---------------- | ---------------- | ---------------- | --------------------- | ---------------------- |
| Branch Hygiene   | Direct main push | Main with revert | Feature branch, no PR | Full PR workflow       |
| Commit Quality   | No message       | Poor message     | Good message          | Conventional commit    |
| Review Process   | None             | Self-review      | Async review          | Sync review + approval |
| CI/CD Compliance | Bypassed         | Partial          | Full run              | Full + coverage        |

## Related Documentation

- [CONTRIBUTING.md](../../../CONTRIBUTING.md) - Project contribution guidelines
- [Shape Up Methodology](https://basecamp.com/shapeup) - Development workflow
- [Conventional Commits](https://www.conventionalcommits.org/) - Commit message format

## Lessons Learned

1. **Automation beats discipline**: Add pre-push hooks and branch protection
2. **Context is fragile**: Always verify branch state after session loss
3. **First principles**: Unix philosophy - small, composable commands with verification
4. **Fail fast**: Better to block a bad push than recover from it

---

_This documentation compounds team knowledge. First violation: 30 min recovery. Future violations: 2 min lookup + automated prevention._
