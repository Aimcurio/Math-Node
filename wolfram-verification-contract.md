# Wolfram Verification Contract

Wolfram is a development-time oracle for generating and checking math fixtures. It is not part of `MathRuntime`, the browser UI, or the runtime provider registry.

## Phase 1 Use

- Generate golden fixtures for operations the local engine already represents: `differentiate`, `simplify`, and `numericEvaluate`.
- Store only deterministic, serializable fixture records.
- Compare symbolic results by parsing into `Expr`, simplifying, canonicalizing, and comparing canonical JSON.
- Treat provider output that cannot be represented by the current `Expr` grammar as `UNSUPPORTED_RESULT`.

## Not Allowed

- Runtime calls to Wolfram.
- Browser credentials or browser-side provider imports.
- Arbitrary Wolfram Language execution from user input.
- Silent string storage of symbolic results that cannot parse into `Expr`.
- Numerical equivalence as a substitute for structural symbolic verification in Phase 1.

## Fixture Fields

- `schemaVersion`
- `operation`
- `input`
- `status`
- `expectedExpr`
- `expectedNumeric`
- `provider`
- `providerVersion`
- `requestDigest`
- `generatedAt`
- `notes`

`expectedExpr` is present only for symbolic `VERIFIED` fixtures. `expectedNumeric` is present only for numeric `VERIFIED` fixtures. `UNSUPPORTED_RESULT` fixtures preserve the parseable input, unrepresentable provider result text, status, provider metadata, digest, and notes, but no executable result. Unary negation and bounded implicit multiplication are representable; function calls and special functions are not.
