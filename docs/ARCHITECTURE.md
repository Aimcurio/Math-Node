# Math Node Architecture

## Core principle
Math Node is model-agnostic and engine-agnostic. The deterministic Math Runtime remains the normal execution path for known operations. LLMs, retrieval, skills, and agents belong to the separate Agent Plane and are invoked only when a capability gap requires development, investigation, or supervised adaptation.

## Communication planes

### Data plane
Machine-to-machine communication uses typed, immutable, versioned structured artifacts rather than natural-language chat wherever practical. Contracts define inputs, outputs, preconditions, postconditions, invariants, error states, provenance, and compatibility.

### Control plane
Orchestration coordinates workflows through explicit states, capability calls, events, and policies. Parallel execution is one strategy, not the default. Pipelines, planner/executor, supervisor/worker, blackboard, critique/revision, voting, and event-driven coordination may be selected according to task semantics.

### Trust plane
Every consequential artifact carries provenance. Verification may include schema validation, deterministic tests, property-based tests, replay, independent review, evidence checks, hashes, and cryptographic signatures where identity or tamper evidence matters. A signature proves provenance/integrity; it does not prove mathematical truth.

## Verified contract rule
No agent, skill, model, engine, or tool becomes a trusted production dependency merely because it returns a plausible result. Interfaces are registered in the Contract Registry and must satisfy their verification policy before promotion.

## Human-in-the-loop rule
Anything requiring human oversight must be presented in natural language. When useful and non-conflicting, the same verified source artifacts should also be rendered visually. Human-facing views are presentation layers, never alternate sources of truth.

Escalations should expose: what happened, why it matters, evidence, confidence/verification status, alternatives, affected contracts/capabilities, and the requested human decision.

## Vision Engine
The Vision Engine is a reusable semantic visualization capability, initially integrated with Math Node and later reusable by NOESIS. It chooses representations according to meaning and decision value, not decoration.

Supported families include equation/derivation trees, dependency graphs, knowledge graphs, agent/contract graphs, sequence/flow diagrams, timelines, mind maps, verification dashboards, and conventional statistical charts.

Visual quality has two dimensions: graphical quality and information quality. Selection must prioritize verified data, provenance, relevance, uncertainty, decision importance, and cognitive clarity. Visuals must not imply certainty unsupported by the underlying artifact.

## Organic capability growth
The roadmap is requirement-driven rather than a predetermined list of mathematics topics. Verified capability unlocks reachable capability space. New capability is promoted only after evidence and verification satisfy its contract.
