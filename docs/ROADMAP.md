# Math Node Roadmap

## Roadmap law
Growth is organic and requirement-driven. Do not pre-commit Math Node to a fixed sequence of mathematical domains. A capability gap creates a candidate development path; verified capability expands the reachable capability graph.

## Phase 0 — Current kernel hardening
- Preserve deterministic local Math Runtime fast path.
- Keep Agent Plane physically and logically separate from routine execution.
- Replace loose `any` boundaries at trust-critical interfaces with versioned contracts.
- Add Contract Registry and compatibility/verification gates.
- Make event/provenance records replayable and auditable.

Exit: known operations execute without LLM/agent/RAG dependency; unsupported operations create structured requirements; contract violations fail closed.

## Phase 1 — Verified Agent Plane
- Audit Agents 001–007 before expanding responsibilities.
- Enforce planner → executor → verifier → commit → memory lifecycle where applicable.
- Treat the five capabilities as skills, not new numbered agents: agentic-math-rag, knowledge-graph-rag, corrective-rag, self-improving-skill-optimizer, trust-gate-audit-team.
- Require independent verification before capability promotion.
- Add explicit HITL escalation contracts.

Exit: capability development is reproducible, evidence-backed, provenance-tracked, and independently reviewable.

## Phase 2 — Communication optimization
- Support coordination patterns beyond parallel agents: sequential pipelines, supervisor/worker, planner/executor, blackboard, critique/revision, consensus/voting, and event-driven workflows.
- Select patterns by contract/policy rather than hard-coding one topology.
- Prefer structured artifacts and typed events over natural-language inter-agent chatter.
- Add cryptographic signing where provenance/tamper evidence warrants it.

Exit: orchestration can choose a verified communication topology per task.

## Phase 3 — Vision Engine
- Implement reusable semantic visualization contracts.
- Render derivations, dependency/knowledge graphs, agent/contract flows, timelines, mind maps, verification views, and statistical charts.
- Rank candidate visuals by data quality, importance, uncertainty, provenance, and cognitive clarity.
- Make HITL views natural-language-first and visual when useful without altering source truth.

Exit: verified artifacts can generate reproducible, decision-useful human views.

## Phase 4 — Provider/model abstraction
- Keep models behind capability/provider contracts.
- Allow local and remote providers without binding Math Node semantics to any vendor.
- Permit policy-based model assignment by capability/task while keeping assignments configuration-driven.
- Evaluate routing by quality, verification performance, latency, privacy, and cost.

Exit: model/provider changes require configuration or adapter changes, not kernel redesign.

## Continuous gates
Every phase requires evidence, provenance, tests, independent review where consequential, backward-compatibility checks for contracts, and explicit failure behavior. Compilation and self-tests alone do not establish production readiness.
