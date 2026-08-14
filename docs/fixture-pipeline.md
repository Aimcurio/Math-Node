# Fixture Pipeline

Math Node uses a two-stage fixture pipeline.

## Stage 1: Candidate Queue

`tests/fixtures/literature-candidates.json` contains untrusted candidate expressions. Candidates may come from manual review, SciSpace, or Sider Scholar, but they are not evals and do not affect runtime behavior.

Candidate rules:

- `sourcePlugin` may be `none`, `scispace`, or `sider_scholar`.
- `status` may be `CANDIDATE`, `REJECTED`, or `PROMOTED`.
- `PROMOTED` entries must be removed from the candidate file and represented in `wolfram-fixtures.json`.
- Candidate expressions must parse in the current local `Expr` grammar before they can remain `CANDIDATE`.

## Stage 2: Verified Wolfram Fixtures

`tests/fixtures/wolfram-fixtures.json` contains trusted offline fixtures. A fixture is trusted only after it is validated against the Wolfram fixture contract and committed as static JSON.

Fixture rules:

- `requestDigest` is SHA-256 over stable JSON containing `schemaVersion`, `operation`, `input`, and `provider`.
- `VERIFIED` symbolic fixtures must include `expectedExpr`.
- `VERIFIED` numeric fixtures must include `expectedNumeric`.
- `UNSUPPORTED_RESULT` fixtures must keep a parseable input and preserve unrepresentable provider output in `providerResultText`; they must not include executable expected output.
- Unary negation and bounded implicit multiplication are valid fixture inputs.
- Function-call outputs such as `sin(x)` remain `UNSUPPORTED_RESULT` until the `Expr` grammar explicitly supports function nodes.
- Tests must never call Wolfram, SciSpace, Sider Scholar, or any network provider.

## Gates

- `npm run test:fixtures` validates Wolfram fixture shape, digest, and deterministic local agreement.
- `npm run test:candidates` validates untrusted candidate shape and parseability.
- `npm run test:boundary` prevents duplicate promotion state between candidates and verified fixtures.
- `npm run test:all` runs TypeScript, all fixture gates, and the production build through local project binaries.
