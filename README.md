# Math Node

Math Node is a deterministic, model-agnostic mathematical runtime with a separate Agent Plane for developing and verifying capabilities that the runtime does not yet possess.

## Architectural laws
- Known operations use the deterministic local fast path; they do not require agents, RAG, skills, or LLMs.
- Capability growth is organic and requirement-driven rather than a predetermined mathematics syllabus.
- Machine-to-machine boundaries use typed, versioned, verifiable contracts and structured artifacts.
- Parallel agents are only one coordination topology; orchestration may choose pipelines, supervisor/worker, planner/executor, blackboards, critique/revision, consensus, or event-driven handoffs.
- Consequential outputs require evidence, provenance, and applicable independent verification before promotion.
- Anything requiring human oversight is presented in natural language and, when useful without creating ambiguity, high-information visuals derived from the same verified source artifacts.
- The reusable Vision Engine optimizes for information quality and decision importance as well as graphical quality.

## Project documents
- `docs/ARCHITECTURE.md` — runtime/agent separation, communication planes, verified contracts, HITL, and Vision Engine.
- `docs/ROADMAP.md` — requirement-driven implementation roadmap and exit gates.
- `docs/AGENTS_AND_SKILLS.md` — agent boundaries, five Agent-Plane skills, communication policy, and promotion rules.

## Core modules
- `src/NOESIS/MathRuntime.ts` — deterministic execution boundary.
- `src/NOESIS/AgentPlane.ts` — capability-development integration scaffold.
- `src/NOESIS/CapabilityRegistry.ts` — available capability registry.
- `src/NOESIS/ContractRegistry.ts` — versioned interface contracts and verified-contract gate.
- `src/NOESIS/VisionEngine.ts` — semantic visualization planning scaffold.
- `src/NOESIS/OKF.ts` — knowledge/provenance storage boundary.
- `src/NOESIS/MathVerifier.ts` — mathematical verification support.

## Current status
The repository remains a prototype/integration scaffold. The new contract and Vision Engine modules establish architectural boundaries; they are not claims of production readiness. The next implementation work is Phase 0 in the roadmap: replace trust-critical loose types, wire contract enforcement into Agent Plane handoffs, and add verification/compatibility tests before expanding mathematical capability.
