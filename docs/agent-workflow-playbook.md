# Agent Workflow Playbook

This playbook captures the repeatable engineering system that worked during Math Node development. It is intended to be portable to other repositories, but only when the target repository also installs the artifacts and gates listed below.

## Evidence Base

- Current Math Node source, tests, fixtures, and role files were inspected before synthesis.
- The local full gate passed with `.\node_modules\.bin\tsx.cmd tests\run-all.ts`.
- Gemini was consulted through `agy` with the Math Node project attached by `--add-dir`.
- Prior session summaries were used only as historical evidence, not as current repository truth.

## Comparative Audit

| System | High-performing primitive | Observed failure mode | Portable rule |
| --- | --- | --- | --- |
| ChatGPT/Codex | Implementation owner and evidence adjudicator. Reads current files, edits narrowly, runs local gates, and resolves reviewer conflicts. | Can over-trust stale conversation memory if current files are not rechecked. | Source, tests, and durable artifacts outrank chat history. Every meaningful claim needs current-file or gate evidence. |
| Google Antigravity / `agy` | Cross-agent CLI bridge for durable review, model routing, and attached workspace context. | Can silently attach an empty or wrong scratch workspace. Reviewer timeout can look like partial progress. | Always pass `--add-dir <project-root>`, require attached-file proof, and treat timeout as `review_unavailable`, not approval. |
| Claude | Adversarial architecture reviewer for serialization, provenance, lifecycle authority, provider leakage, and security boundaries. | Deep source review can time out or remain too broad when the slice is not bounded. | Give Claude a locked brief, a small decision surface, and required findings format: severity, source evidence, counterexample, acceptance test. |
| Gemini | Adversarial implementation reviewer for state transitions, malformed inputs, test isolation, AST representability, and provider/UI coupling. | Can produce partial reviews when the scope is too large; may write planning artifacts unless explicitly constrained by environment. | Use Gemini for bounded implementation/test falsification, with read-only instructions and explicit acceptance criteria. |

## Universal Framework

1. Deterministic core first. The runtime path must be explicit about whether it may call LLMs, networks, provider SDKs, or retrieval. If the answer is no, enforce that with tests and import scans.
2. Separate metadata from execution. Store serializable capability records, manifests, schemas, and provenance separately from executable local implementations.
3. Register capabilities atomically. Validate IDs, dependencies, versions, implementation refs, and verification evidence before mutating registries.
4. Make unsupported states typed. Use explicit states such as `UNSUPPORTED`, `PROVIDER_ERROR`, `UNSUPPORTED_RESULT`, `CANDIDATE`, `VERIFIED`, and `review_unavailable` instead of ambiguous failure prose.
5. Quarantine untrusted evidence. Research output, LLM suggestions, provider errors, and candidate fixtures stay outside trusted evals until promoted by a deterministic gate.
6. Use PEV loops. Every agent task starts with a plan, executes one bounded slice, and verifies with the repository gate before claiming completion.
7. Turn prompts into harnesses. Replace "follow standards" with type checks, linters, schema validation, fixture digests, dependency boundary tests, and import scans.
8. Install computational sensors. Pre-commit or CI should return precise failures for schema drift, duplicate fixture promotion, provider leakage, unverified capabilities, and broken canonicalization.
9. Preserve durable context. Keep the task brief, role files, fixture pipeline, decision log, and review artifacts in the repo so sessions do not depend on long prompt history.
10. Route models by role. Codex owns implementation and adjudication; Claude challenges architecture; Gemini challenges implementation and tests; the user decides only disputed or authority-required choices.
11. Treat reviewer absence as data. A timeout, quota error, empty workspace, or denied permission is a classified state, not a soft approval.
12. Prove parity by gates. A repository has adopted this framework only when its artifacts exist and its full local gate verifies the same boundaries.

## Harness Engineering Rules

Feedforward enforcers should block bad paths before runtime:

- Type system and lint checks for module contracts.
- Schema validation for manifests, fixtures, handoffs, and review findings.
- Import-boundary tests that fail if runtime code imports forbidden providers.
- Registry lifecycle tests that prove invalid modules do not partially mutate state.
- Fixture digest checks based on stable JSON.

Feedback sensors should feed precise failures back into the agent loop:

- `tests/run-all.ts` or equivalent one-command gate.
- Contract tests for every capability boundary.
- Candidate-vs-promoted fixture boundary tests.
- Source searches for forbidden SDKs, credentials, browser adapters, or network calls.
- Review status classification: `validated`, `review_unavailable`, `schema_quarantine`, `missing_artifact`, `timeout`, `quota_exhausted`.

## Context Engineering Rules

Each repository should keep these durable context files:

- `AGENTS.md`: provider-neutral coding and verification rules for all agents.
- `project-task-brief.md`: current goal, locked boundaries, supported operations, and acceptance tests.
- `.agents/roles/claude-architecture-review.md`: architecture threat model and findings format.
- `.agents/roles/gemini-implementation-review.md`: implementation/test threat model and findings format.
- `.agents/templates/roundtable-gate.md`: consensus and HITL escalation protocol.
- `docs/evidence-boundaries.md`: trusted, untrusted, offline, runtime, and quarantine evidence rules.
- `docs/fixture-pipeline.md`: candidate, promotion, fixture, digest, and oracle workflow.
- `docs/decision-log.md`: dated decisions, evidence, dissent, and follow-up gates.

Use directory-level rule files when subtrees have different constraints. For example, runtime code can prohibit provider SDK imports while offline tooling can allow a provider adapter under a separate gate.

## Coding Standards

- Prefer discriminated unions for domain states and error classes.
- Include `schemaVersion` in portable records.
- Use stable identifiers for capabilities, for example `calculus.differentiation`.
- Version capability implementations explicitly, for example `local:calculus.differentiate:v1`.
- Keep executable implementations out of serialized metadata.
- Validate batch operations before mutation.
- Compare structured canonical forms, not formatted strings.
- Preserve provider failures as evidence text; do not coerce them into trusted outputs.
- Keep UI exposure behind verified capability availability.
- Add contract tests before broadening a grammar, provider boundary, or capability family.

## Required Repository Artifacts

Minimum parity kit:

- `AGENTS.md`
- `project-task-brief.md`
- `.agents/roles/claude-architecture-review.md`
- `.agents/roles/gemini-implementation-review.md`
- `.agents/templates/codex-owner.md`
- `.agents/templates/roundtable-gate.md`
- `docs/evidence-boundaries.md`
- `docs/fixture-pipeline.md` when fixtures or external oracles exist
- `docs/decision-log.md`
- `tests/run-all.*` or `scripts/verify-all.*`
- Contract tests for runtime boundaries
- Schema tests for structured artifacts
- Import-boundary tests for forbidden runtime dependencies

Optional but recommended:

- `schemas/review-finding.schema.json`
- `schemas/capability-record.schema.json`
- `tests/fixtures/candidates.json`
- `tests/fixtures/verified-fixtures.json`
- `scripts/check-provider-boundary.*`
- `scripts/check-review-artifacts.*`

## Agent Templates

### Codex Owner

```text
You are the implementation owner and evidence adjudicator. Read AGENTS.md and project-task-brief.md first. Inspect current files before using memory. Implement only one bounded slice. Add or update contract tests before claiming support. Run the full local gate and report exact pass/fail status. Do not treat reviewer timeout, quota exhaustion, or missing artifacts as approval.
```

### Antigravity / agy Review Command

```powershell
agy --model <model> --mode plan --sandbox --add-dir <project-root> --print-timeout 10m -p "<review prompt>"
```

The review prompt must require the reviewer to name the attached project root and cite the exact files inspected before findings are trusted.

### Claude Architecture Review

```text
You are the adversarial architecture reviewer. Read project-task-brief.md before source. Attack serialization, provenance, lifecycle authority, compatibility, security, provider leakage, invalid state transitions, and ambiguous ownership. Return findings only in this format: severity, source evidence, counterexample, acceptance test. Do not modify files. If you cannot inspect the attached files, return review_unavailable.
```

### Gemini Implementation Review

```text
You are the adversarial implementation reviewer. Read project-task-brief.md before source. Try to break the smallest proposed slice through malformed input, state transitions, error paths, test isolation, canonicalization, representability, and provider/UI coupling. Return a ranked implementation/test plan with evidence and acceptance criteria. Do not modify files. If the scope is too large, say so and propose a narrower review.
```

### Roundtable Gate

```text
Decision: <one sentence>
Evidence bundle: <files, tests, fixture records, review links>
Codex position: <implementation owner summary>
Claude challenge: <architecture risks>
Gemini challenge: <implementation/test risks>
Consensus: <yes/no>
Required gate: <test/schema/review/user approval>
HITL needed when: reviewers disagree, a required reviewer is unavailable for a high-impact choice, or authority is required.
```

## Porting Checklist

1. Create the minimum parity kit files.
2. Define runtime-forbidden dependencies and prove them with import-boundary tests.
3. Define typed trusted, untrusted, quarantined, and promoted states.
4. Add one full local gate command.
5. Add one contract test for unsupported behavior.
6. Add one atomic registration or lifecycle test for the core extension mechanism.
7. Add one review template for architecture and one for implementation.
8. Run Codex, Claude, and Gemini against the same evidence bundle.
9. Record consensus or HITL escalation in `docs/decision-log.md`.
10. Promote only the decisions that passed deterministic gates.

## Cautions

- Math Node's strict no-runtime-provider rule should not be blindly copied to products whose core purpose is dynamic model or network execution. Copy the explicit boundary pattern, not necessarily the same boundary.
- Multi-agent review adds overhead. Use the full roundtable only for high-impact architecture, trust, provider, or lifecycle choices.
- Offline oracles are only trustworthy when fixture provenance, static storage, digests, and promotion gates are present.
- A passing build is not enough. The behavioral contracts and evidence boundaries are the actual readiness gate.
