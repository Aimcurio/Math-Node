# Math Node - Core Contract Audit and Development Gate

## Current goal

Turn the current NOESIS Math Node prototype into a testable, model-agnostic core without expanding into autonomous capability generation, remote providers, or UI changes.

## Verified starting state

- `MathRuntime` seeds an in-memory registry with deterministic local implementation references.
- `MathRuntime` accepts capability modules; the default foundation module is only one module, not a hardcoded ceiling.
- `CapabilityRecord` is serializable metadata; executable implementations sit in `ProviderRegistry`.
- Unknown operations return an `UnsupportedRequirement`; the Agent Plane is not invoked by the runtime.
- The parser supports a small arithmetic AST with explicit arithmetic, unary negation, and bounded implicit multiplication. Function calls are still unsupported.

## Locked boundaries

1. The deterministic Math Runtime must not depend on an LLM, RAG, web retrieval, or provider SDK.
2. No credentials, arbitrary Wolfram Language evaluation, or external execution in the browser.
3. Capability metadata must be serializable and provenance-bearing; executable implementations must sit behind explicit deterministic provider interfaces.
4. Verification evidence, rather than a successful build, determines availability.
5. Future capabilities must enter through explicit capability modules, not runtime rewrites.

## Modularity contract

- A capability module declares `moduleId`, capability IDs, local implementation refs, dependencies, and deterministic implementations.
- `MathRuntime` registers modules but does not own capability-specific implementation logic.
- The foundation expression capabilities live in `FoundationModule`.
- Differentiation lives in `CalculusDifferentiationModule`; constructing that module requires a passed `calculus.differentiation` verification record.
- Capability modules may compose through provider refs; capability dependencies must not be cosmetic metadata only.
- New capability families should add a module file and tests before UI exposure.
- Module registration must preserve serializable `CapabilityRecord` metadata and local-only `ProviderRegistry` implementation storage.

## Wolfram verification fixture contract

Wolfram is allowed only as an offline development-time oracle for golden fixtures and eval corpus generation. It is not a runtime provider, not a browser dependency, and not a fallback calculator.

Phase 1 scope:

- Allowed operations: `differentiate`, `simplify`, and `numericEvaluate`.
- Disabled until the local AST and verifier expand: `integrate`, `limit`, trigonometric functions, and special functions.
- Inputs must be normalized structured requests or expressions accepted by the current `Expr` parser.
- Results must parse into the current `Expr` grammar and pass deterministic canonicalization before they can become `VERIFIED` fixtures.
- Provider results outside the current AST become `UNSUPPORTED_RESULT`; they must not be coerced, numerically guessed, or silently stored as strings.
- Fixture records must include operation, input, expected expression or numeric result, status, provider name/version when available, request digest, generation time, and notes.
- Runtime and UI code must not import a Wolfram adapter. Tests may read committed fixtures only.
- `tests/fixtures/wolfram-fixtures.json` is the committed offline fixture corpus.
- `tests/validate-wolfram-fixtures.test.ts` is the offline promotion gate for fixture shape and local deterministic agreement.
- Fixture `requestDigest` values are SHA-256 hashes over stable JSON containing `schemaVersion`, `operation`, `input`, and `provider`.
- `tests/fixtures/literature-candidates.json` is an untrusted staging queue for candidate expressions from manual review, SciSpace, or Sider Scholar.
- Literature candidates are never trusted evals; promotion requires a matching static Wolfram fixture.
- `tests/fixture-boundary.test.ts` prevents duplicate promotion state between candidate and Wolfram fixture corpora.
- `docs/fixture-pipeline.md` describes the trusted/untrusted fixture workflow.
- `docs/benchmark_coverage.md` tracks benchmark and literature coverage without adding runtime dependencies.

Acceptance tests for this contract:

- A fixture result containing an unsupported function is rejected as `UNSUPPORTED_RESULT`.
- `x + 2` and `2 + x` canonicalize to the same structural form.
- `2x` canonicalizes to `2*x`.
- `(x+1)(x-1)` canonicalizes to `(x+1)*(x-1)`.
- `-x` and `-x^2` parse without weakening function-call rejection.
- Differentiation verification compares canonical AST structure, not whitespace-stripped strings.
- A source search for runtime Wolfram imports returns no hits.
- `npm run test:fixtures` passes without any network or provider calls.
- `npm run test:candidates` passes while keeping promoted literature entries out of the candidate queue.
- `npm run test:boundary` passes, proving fixture digests are unique and candidate records have not already been promoted.

## Claude - adversarial architecture reviewer

Read this brief and the current source. Attempt to disprove the proposed contract: find implicit trust boundaries, serialization leaks, versioning/provenance gaps, invalid state transitions, and API ambiguities. For Wolfram work, attack runtime leakage, browser credentials, arbitrary execution, unsupported-result coercion, and fixture provenance. For every concern, cite source evidence and propose an acceptance test. Do not modify code or prescribe broad refactors.

## Gemini - adversarial implementation and integration reviewer

Read this brief and the current source. Independently assess the smallest feasible implementation slice and try to falsify it through lifecycle, parser, error, and testability edge cases. For Wolfram work, attack AST representability, canonicalization false positives/negatives, malformed fixtures, and accidental provider or UI coupling. Recommend narrowly scoped code and tests only. Do not modify code.

## Roundtable gate

1. Codex prepares a bounded proposal and evidence bundle.
2. Claude challenges the architecture and contracts.
3. Gemini challenges feasibility and test coverage independently.
4. Codex resolves conflicts and presents an evidence-backed consensus.

No high-impact implementation begins until this gate identifies one bounded slice with explicit acceptance tests.

HITL is required when Codex and the available reviewer do not reach consensus, or when the assigned reviewer is unavailable for a high-impact architecture decision. Low-risk implementation fixes may proceed with one reviewer if they stay inside locked boundaries and pass the local full gate.
