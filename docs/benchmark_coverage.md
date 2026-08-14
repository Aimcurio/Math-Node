# Benchmark Coverage

This file tracks how the static Math Node fixture corpus maps to external benchmark or literature sources. It is documentation only. It does not authorize runtime provider calls, automated literature search, or non-Wolfram eval oracles.

## Current Coverage

| Area | Fixture Source | Status | Notes |
| --- | --- | --- | --- |
| Basic differentiation | `tests/fixtures/wolfram-fixtures.json` | Seeded | Covers `d/dx(x^2)`. |
| Basic simplification | `tests/fixtures/wolfram-fixtures.json` | Seeded | Covers additive identity. |
| Numeric evaluation | `tests/fixtures/wolfram-fixtures.json` | Seeded | Covers one-variable substitution. |
| Unsupported functions | `tests/fixtures/wolfram-fixtures.json` | Seeded | Covers `sin(x)` as unsupported by current AST. |
| Polynomial and sign edge cases | `tests/fixtures/literature-candidates.json` | Candidate only | Cubic, mixed-sign, parenthesized-product, and unary-negation cases await offline validation. |
| Literature-derived expressions | `tests/fixtures/literature-candidates.json` | Candidate only | Must be promoted through Wolfram fixture validation before use as evals. |

## Research Plugin Boundary

SciSpace may be used to find candidate expressions, theorem shapes, and edge cases. Sider Scholar may be used to identify canonical papers or datasets for traceability. Neither plugin may write eval fixtures directly or run during tests.

## Promotion Requirement

Every benchmark or literature-derived expression must pass through:

1. Candidate entry in `literature-candidates.json`.
2. Manual representability review against the current `Expr` grammar.
3. Wolfram offline validation.
4. Static fixture entry in `wolfram-fixtures.json`.
5. Passing `test:fixtures`, `test:candidates`, and `test:boundary`.
