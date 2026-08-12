import { motion } from 'motion/react';
import { FileText, Download } from 'lucide-react';

const markdownContent = `
# Math Node: Architecture & Integration Spec

**Mission**
You are working on the Math Node: a hybrid mathematical execution and capability-development system.

The Math Node has two fundamentally different planes:

\`\`\`text
                         MATH NODE
                            │
             ┌──────────────┴──────────────┐
             │                             │
             ▼                             ▼
       MATH RUNTIME                    AGENT PLANE
       Deterministic                  Heuristic / Generative
       Fast execution                 Capability development
             │                             │
             └──────────────┬──────────────┘
                            │
                            ▼
                    KNOWLEDGE SUBSTRATE
                         OKF / RAG
\`\`\`

The central architectural principle is: **The Agent Plane is not the Math Runtime.**
The Math Runtime performs known mathematical operations directly.
The Agent Plane exists to discover, develop, verify, integrate, and register new mathematical capabilities when the runtime encounters something it does not currently support.

---

### 1. MATH RUNTIME
The Math Runtime is the fast path. It should be:
- deterministic
- local
- low latency
- independently testable
- minimally abstracted
- free of unnecessary LLM involvement
- safe to execute repeatedly

For example: \`differentiate(x² + 3x + 1)\`
If differentiation is already available and verified, the path should simply be:
\`REQUEST → PARSE → ROUTE → KNOWN CAPABILITY → EXECUTE → 2x + 3\`

**Do NOT route ordinary mathematical operations through the agent system.**

---

### 2. AGENT PLANE
The Agent Plane is the evolutionary mechanism of the Math Node. It consists of seven specialized agents:
- **001** — Requirement / Discovery
- **002** — Validation
- **003** — Capability Construction
- **004** — Relationship / Integration
- **005** — Knowledge Representation
- **006** — Verification
- **007** — Orchestration

These agents do not replace the Math Runtime. They operate when the runtime encounters a requirement that cannot currently be satisfied. This separation is mandatory.

---

### 3. THE SEVEN AGENTS

The seven agents are not a linear execution pipeline for mathematical requests. They are specialized functions available to the Agent Plane.

#### Agent 001 — Requirement / Discovery
*Core question: What is required?*
**Responsibilities:**
- inspect a mathematical request
- identify the requested operation and required capabilities
- identify missing capabilities and dependencies
- produce a structured requirement

#### Agent 002 — Validator
*Core question: Is the requirement and its inputs valid?*
**Responsibilities:**
- validate schemas, mathematical inputs, and dependencies
- detect malformed requirements
- prevent invalid artifacts from entering later stages

#### Agent 003 — Capability Builder
*Core question: How can the required mathematical capability be constructed?*
**Responsibilities:**
- develop the missing mathematical capability
- identify applicable mathematical rules
- generate implementation artifacts and candidate tests

#### Agent 004 — Relationship / Integration
*Core question: How does this capability connect to the existing system?*
**Responsibilities:**
- identify capability dependencies
- connect mathematical concepts and integration points
- establish relationships (HYPOTHESIZED vs VERIFIED)

#### Agent 005 — Knowledge Representation
*Core question: What should the Math Node remember?*
**Responsibilities:**
Retain verified capability + knowledge about that capability (dependencies, creation requirement, provenance, verification tests, history). Knowledge objects should be immutable (Version 1 → Version 2).

#### Agent 006 — Mathematical Verification
*Core question: Does this capability actually work?*
**Responsibilities:**
Mathematical correctness. Verification should use executable evidence whenever possible (known-answer tests, symbolic identities, property tests). Agent 006 must not simply accept an LLM assertion that the implementation is correct.

#### Agent 007 — Orchestrator
*Core question: What happens next?*
**Responsibilities:**
Coordinates execution of the Agent Plane. Routes tasks, enforces dependencies, handles failures.
*Must NOT:* invent mathematical reasoning, modify semantics, or become a hidden intelligence layer.

---

### 4. KNOWLEDGE SUBSTRATE
The Knowledge Substrate is persistent memory.
It should support both **CAPABILITY RETRIEVAL** and **KNOWLEDGE / PROVENANCE RETRIEVAL**.

---

### 5. ORGANIC CAPABILITY DEVELOPMENT
Do NOT create a rigid predefined mathematics tree. Begin with a small deterministic foundation:
\`expression.parse, expression.normalize, expression.evaluate, expression.simplify\`
Capabilities grow when actual requirements demand them (The Organic Growth Loop).

---

### 6. IMPORTANT PERFORMANCE PRINCIPLE
Do not turn every mathematical operation into an agent workflow. The agents are invoked only when necessary.

---

### 7. VERIFICATION MESH
Verification should occur at multiple layers:
- **Build-Time**: Heavy verification (unit tests, property tests, fuzzing)
- **Registration-Time**: Validate schemas, dependencies, contracts, evidence
- **Runtime**: Cheap checks (AST invariants, type constraints)

---

### 8. CAPABILITY REGISTRY & LIFECYCLE
The Math Node requires a registry representing what is available.
Lifecycle: \`DISCOVERED → VALIDATED → BUILDING → INTEGRATED → VERIFIED → REGISTERED → AVAILABLE\`
A capability under construction must never accidentally become callable.

---

### 9. FIRST IMPLEMENTATION TARGET
Do not attempt to build the entire mathematical system immediately.
Start with a tiny verified runtime. Deliberately introduce \`differentiate(x² + 3x + 1)\`.
Demonstrate that the Agent Plane creates the capability, registers it, and subsequent calls (e.g., \`differentiate(4x³ - 7x² + 2)\`) use the fast path.

---

### 10. BEFORE CODING
Do NOT immediately rewrite the existing seven-agent implementations.
First inspect the supplied agent directories and determine actual entry points, schemas, etc.
Produce: **MATH NODE — AGENT INTEGRATION AUDIT**.
Identify boundaries and minimum contracts required.

---

### 11. IMPLEMENTATION PRINCIPLES
- Prefer direct implementations over unnecessary abstraction.
- Keep deterministic mathematics in the Math Runtime.
- Keep heuristic/generative work in the Agent Plane.
- Never invoke the Agent Plane for a known verified capability.
- Agent 007 remains execution-only.
- Mathematical verification must be evidence-based.
- Do not modify the existing agent implementations until the integration audit is complete.

---

### 12. IMMEDIATE DELIVERABLE
Produce: **MATH NODE AGENT ARCHITECTURE & INTEGRATION AUDIT**.
Determine: How do we integrate Agents 001–007 into the Math Node's Agent Plane while keeping the Math Runtime extremely small, deterministic, fast, and independent of agent reasoning?
`;

export default function SpecSheet() {
  const downloadMarkdown = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'math-node-specsheet.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 2.5 }}
      className="w-full max-w-5xl mx-auto px-4 pb-32 font-sans mt-8"
    >
      <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-6 md:p-10 backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-6 mb-8">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-zinc-400" />
            <h2 className="text-xl md:text-2xl font-medium text-zinc-100 tracking-wide">Math Node Spec & Handoff</h2>
          </div>
          <button 
            onClick={downloadMarkdown}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-sm transition-colors border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600"
          >
            <Download className="w-4 h-4" /> Export MD
          </button>
        </div>

        <div className="text-zinc-300 text-sm leading-relaxed font-mono whitespace-pre-wrap overflow-x-auto">
          {markdownContent}
        </div>
      </div>
    </motion.div>
  );
}
