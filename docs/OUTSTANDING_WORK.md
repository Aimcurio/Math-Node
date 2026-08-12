# Math Node Outstanding Work & Verification Ledger

This document is the canonical ledger for work that is documented but not yet fully implemented, integrated, tested, or independently verified. It complements `ROADMAP.md`; the roadmap describes sequence and intent, while this file records concrete gaps and closure criteria.

## Status vocabulary

- **IMPLEMENTED** — code exists and is integrated into the relevant execution path.
- **DOCUMENTED** — architecture/policy is defined, but implementation is incomplete or absent.
- **SCAFFOLDED** — code shape exists, but production behavior or integration is incomplete.
- **UNVERIFIED** — implementation exists but has not satisfied the required verification gate.
- **VERIFIED** — acceptance criteria and required independent checks have passed.
- **BLOCKED** — cannot proceed until a listed dependency or decision is resolved.

## Current ledger

| Area | Current status | Outstanding work | Closure criteria |
|---|---|---|---|
| Deterministic Math Runtime fast path | IMPLEMENTED / UNVERIFIED | Audit that known operations never require Agent Plane, RAG, skills, or remote models; add regression tests. | Automated tests prove known-operation isolation and fail if an agent/model dependency is introduced. |
| Agent Plane separation | SCAFFOLDED | Audit all call paths and enforce explicit boundary between runtime execution and capability development. | Unsupported operations alone may enter Agent Plane; boundary tests pass. |
| Agent interfaces 001–007 | SCAFFOLDED | Replace trust-critical `any` inputs/outputs with typed, versioned contracts; document preconditions, postconditions, failures, and invariants. | All trust-boundary interfaces use registered contracts and compile without loose boundary types. |
| Contract Registry | SCAFFOLDED | Wire registry into actual agent/skill/tool handoffs; add schema validation, compatibility checks, and fail-closed behavior. | Every consequential handoff resolves a verified contract before execution; incompatible versions are rejected. |
| Contract verification | DOCUMENTED | Define executable verification policies, property tests where useful, and independent review gates. | Verified status cannot be assigned without recorded evidence satisfying contract policy. |
| Event/provenance replay | DOCUMENTED | Define immutable event envelope, event IDs, causality/correlation IDs, hashes, replay semantics, and failure recording. | A capability-development run can be replayed/audited from stored events and provenance. |
| Cryptographic provenance/signatures | DOCUMENTED | Define threat model and select where signatures are warranted; do not use signatures as a substitute for mathematical verification. | Signed artifacts verify origin/integrity under the documented threat model; truth verification remains separate. |
| Five Agent-Plane skills | DOCUMENTED | Implement or integrate `agentic-math-rag`, `knowledge-graph-rag`, `corrective-rag`, `self-improving-skill-optimizer`, and `trust-gate-audit-team` behind verified skill contracts. | Each skill has a versioned contract, tests, provenance behavior, failure policy, and promotion gate. |
| Self-improvement governance | DOCUMENTED | Enforce candidate-only revisions from optimization; prohibit self-promotion into trusted state. | Optimizer output cannot become active without independent verification and explicit promotion event. |
| HITL escalation | DOCUMENTED | Create a typed escalation artifact and a human-facing renderer that explains evidence, uncertainty, alternatives, consequences, and required decision. | Every human-required transition produces a reproducible natural-language view from the source artifact. |
| HITL visual support | DOCUMENTED / SCAFFOLDED | Connect human oversight views to Vision Engine; ensure visuals never hide or alter uncertainty/provenance. | Human reviewer can inspect underlying evidence and provenance from every consequential visual. |
| Vision Engine | SCAFFOLDED | Replace heuristic-only selection with semantic contracts, renderer adapters, data-quality ranking, importance ranking, accessibility, and verification. | Same verified input yields reproducible visual plans; incorrect/unsupported certainty is explicitly prevented. |
| Visualization renderer layer | NOT IMPLEMENTED | Add pluggable renderers for derivation trees, dependency/knowledge graphs, sequence/flow diagrams, timelines, mind maps, verification dashboards, and statistical charts. | Renderer contract tests pass; renderers preserve source values and provenance references. |
| Visualization information-quality policy | DOCUMENTED | Formalize scoring for verification status, provenance quality, relevance, importance, uncertainty, and cognitive load. | Visual selection/ranking has testable scoring rules and explanation output. |
| Multi-agent communication topology selection | DOCUMENTED | Implement orchestration policy for sequential, parallel, supervisor/worker, planner/executor, blackboard, critique/revision, consensus/voting, and event-driven patterns. | Orchestrator selects topology by explicit policy and records why; topology behavior is testable. |
| Blackboard/shared-artifact communication | NOT IMPLEMENTED | Define shared artifact schema, ownership, conflict handling, revision semantics, and verification rules. | Concurrent contributors cannot silently overwrite trusted state; revisions are attributable and auditable. |
| Consensus/voting | NOT IMPLEMENTED | Define where voting is appropriate, quorum/weight rules, tie/failure handling, and independent verification requirements. | Voting can never substitute for deterministic proof where deterministic verification is available. |
| Model/provider abstraction | DOCUMENTED | Add provider interface and configuration-driven capability-to-model routing; keep provider-specific details outside kernel semantics. | Swapping provider/model requires adapter/config change only and passes provider contract tests. |
| OpenRouter integration | PLANNED | Implement OpenRouter as one optional provider behind the provider abstraction, not as a core dependency. | OpenRouter can be enabled/disabled or replaced without changing Math Runtime or capability semantics. |
| Task-to-model assignment | DOCUMENTED | Define configuration schema for preferred model(s), fallbacks, privacy/cost/latency/quality constraints, and verification requirements. | Routing decisions are inspectable, policy-driven, and do not hard-code vendors into capabilities. |
| Independent mathematical verification | PARTIAL / UNVERIFIED | Expand beyond current deterministic examples; define verifier independence rules and domain-specific verification strategies. | Consequential capability outputs have independent verification evidence before trusted promotion. |
| OKF provenance semantics | SCAFFOLDED | Audit immutable/revision behavior, relationship integrity, verification references, and conflict handling. | OKF cannot register a trusted capability lacking required provenance and verification references. |
| Capability promotion lifecycle | SCAFFOLDED | Enforce explicit states and transitions: discovered → validated → building → integrated → verified → registered → available, with rejection/failure paths. | Invalid transitions fail closed and all transitions produce auditable records. |
| Failure taxonomy and recovery | PARTIAL | Define machine-readable failure classes for contract, verification, retrieval, provider, orchestration, and human-decision failures. | Failure handling is deterministic, typed, logged, and does not silently degrade trust requirements. |
| Backward compatibility | DOCUMENTED | Add contract version compatibility matrix and migration/deprecation rules. | Breaking contract changes are detected before deployment/integration. |
| CI verification gates | NOT IMPLEMENTED / UNKNOWN | Add compile, unit, property, contract, boundary, replay, compatibility, and security/provenance checks as appropriate. | Required checks run automatically and block promotion when failing. |
| Security/threat model | NOT IMPLEMENTED | Document secrets handling, untrusted model/tool output, prompt/tool injection boundaries, provenance attacks, tampering, and least-privilege rules. | Threat model reviewed; security controls mapped to tests and trust boundaries. |
| Documentation/code conformance | UNVERIFIED | Add recurring architecture-conformance audit so docs cannot claim behavior the code does not enforce. | Conformance report identifies implemented, partial, and divergent architecture claims on every milestone. |

## Priority closure order

### P0 — Trust boundary hardening
1. Replace trust-critical `any` interfaces with versioned contract types.
2. Wire `ContractRegistry` into Agent Plane and skill/tool handoffs.
3. Define fail-closed contract validation and lifecycle transitions.
4. Enforce provenance + verification prerequisites for trusted capability promotion.
5. Add runtime/Agent Plane boundary tests.

### P1 — Auditability and verification
1. Define immutable event/provenance envelope and replay semantics.
2. Expand independent mathematical verification.
3. Add contract/property/compatibility tests.
4. Add architecture/code conformance reporting.
5. Establish CI verification gates.

### P2 — Human oversight and visualization
1. Define HITL escalation artifact contract.
2. Connect Vision Engine to HITL presentation.
3. Add visualization data-quality/importance policy.
4. Implement pluggable renderer contracts and initial renderer set.
5. Verify visual reproducibility and provenance traceability.

### P3 — Agent communication optimization
1. Implement topology-selection policy.
2. Add blackboard/shared-artifact protocol.
3. Add critique/revision and consensus policies where appropriate.
4. Verify orchestration decisions and record topology rationale.

### P4 — Provider/model abstraction
1. Implement provider interface.
2. Add configuration-driven task/capability routing.
3. Add OpenRouter as an optional provider.
4. Add provider fallback/privacy/cost/quality policies and verification tests.

## Definition of "safe to proceed"

The project may continue evolving while items remain outstanding, provided that:

1. This ledger remains authoritative and current.
2. Documentation never labels scaffolded or planned behavior as verified production behavior.
3. Unverified functionality cannot silently cross a trust boundary or be promoted to trusted capability.
4. Human oversight is required wherever policy says it is required, and the human receives a natural-language explanation with visuals when they improve clarity without distorting the underlying evidence.
5. New architectural decisions add or update a ledger entry until implementation and verification close the item.

## Closure protocol

When an item is completed, update this ledger with the evidence used to close it: relevant files/commits, tests, verifier results, migration notes, and any remaining limitations. Do not delete history simply because an item is closed; retain enough status history to audit how the project reached its current state.
