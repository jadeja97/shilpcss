# Changelog

## 1.0.0-alpha.10

### Minor Changes

- refactor: infra.
  - add no check script
  - update oxlint to fix memeory issue
  - fix `docs.yml` to remove additional checking
  - fix lint staged

## 1.0.0-alpha.9

### Minor Changes

- refactor: integrate `@jadeja/ts`

## 1.0.0-alpha.8

## Patch Changes

- fix: `ci.yml` comments and turbo tasks

## 1.0.0-alpha.7

## Minor Changes

- moved `.gitattibutes` to the project root
- refactor `.md` files as per formatter and linter

## 1.0.0-alpha.6

### Minor Changes

- feat: integrate linter and formatter for code standarization
  - add few packages to workspace root
  - setup `oxfmt` and `oxlint` to ignore everything and granularly controlled at sub-folder level
  - setup `lint-staged` with `pre-commit` hook
  - simplified the scripts

### Patch Changes

- refactor: moved turbo and next telemetry disable to `.env` file
  - add exception for `.env` in `.gitignore`
- refactor: github actions workflows
  - scoped the `ci.yml` and `docs.yml` regarding `check`, `build` and `permission`

## 1.0.0-alpha.5

### Patch Changes

- add name property to `docs.yml`'s `check_version` job
- remove `create-release-pr.yml` and `release.yml`
  - update `ci.yml` for this change
- remove `changeset` and related files and content

## 1.0.0-alpha.4

### Patch Changes

- fix: update workflow for npm auth error
- feat: added `workflow_dispatch` trigger for manual action

## 1.0.0-alpha.3

### Patch Changes

- refactor actions workflows
  - refactor job execution conditions (earlier it was producing race conditions)
  - used "Reusable Workflows" instead of "Dependent Workflows"
  - `ci.yml`: execution conditions made more strictor
  - `create-release-pr.yml` and `docs.yml`
    - now called and executed by `ci.yml` conditionally as its job
    - this workflows splitted into two jobs, one for evaluation and other for
      actual job
  - `release.yml` splitted into two jobs, one for evaluation and other for
    actual job

## 1.0.0-alpha.2

### Patch Changes

- minor changes in github issue templates
  - `bug_report.yml`: is not visible, bug not identified yet
  - `config.yml`: enable blank template due to `bug_report.yml` is not visible
  - `docs.yml`: removed emoji from name
- disable turbo repo telemetry

## 1.0.0-alpha.1

### Patch Changes

- remove "shilpcss-docs" from changeset

## 1.0.0-alpha.0

शुभारम्भः

---

**Shilp CSS Monorepo**

All notable changes to this project is documented in this file.

The format is loosely based on
[Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).
