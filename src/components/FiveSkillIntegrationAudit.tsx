import { motion } from 'motion/react';
import { FileText, Download, Target } from 'lucide-react';

const markdownContent = `
# MATH NODE — FIVE SKILL INTEGRATION AUDIT

## Executive Summary
The five supplied capabilities—Agentic Math RAG, Knowledge Graph RAG, Corrective RAG, Self-Improving Skill Optimizer, and Trust-Gate Audit Team—are **skills, not agents**. They will be integrated as lightweight library functions accessible to Agents 001–007. 

To satisfy the "No Premature Infrastructure" rule, heavy dependencies (Neo4j, Qdrant, LangGraph, DSPy, FastAPI) from the reference implementations are **REJECTED**. Only their core logical patterns (routing, grading, hash-chaining, keep-best loops) will be **ADAPTED** into minimal, deterministic TypeScript functions.

---

## 1. Skill Audits

### A. Agentic Math RAG
- **Current Purpose:** Route between academic KB and web search using DSPy guardrails.
- **Math Node Role:** Provides mathematical reference knowledge (rules, identities) to Agents 001, 003, and 006.
- **Knowledge Substrate Interaction:** Reads mathematical axioms.
- **Runtime Interaction:** **NONE.** Known math executes directly.
- **Decisions:**
  - **REJECT:** LlamaIndex, Qdrant, DSPy.
  - **KEEP:** Domain-gate logic (refuse non-math), fallback routing (KB vs. Web).
  - **ADAPT:** Implement as a simple semantic lookup against the OKF.

### B. Knowledge Graph RAG
- **Current Purpose:** Extract entities and relations into Neo4j for verifiable multi-hop citations.
- **Math Node Role:** Dependency and capability relationship mapping for Agents 004 and 005.
- **Knowledge Substrate Interaction:** Writes capability dependencies (e.g., \`differentiation -[DEPENDS_ON]-> expression.parse\`).
- **Runtime Interaction:** **NONE.**
- **Decisions:**
  - **REJECT:** Neo4j, Cypher injections, LangChain.
  - **KEEP:** Citation tracking, multi-hop dependency resolution.
  - **ADAPT:** Use a lightweight in-memory directed acyclic graph (DAG) persisted to the OKF.

### C. Corrective RAG (CRAG)
- **Current Purpose:** LangGraph state machine to grade retrieved docs and fallback to web search.
- **Math Node Role:** Retrieval quality control. Prevents Agent 003 from hallucinating a capability based on bad search results.
- **Knowledge Substrate Interaction:** Read-only (grades retrieved axioms).
- **Runtime Interaction:** **NONE.**
- **Decisions:**
  - **REJECT:** LangGraph, global state singletons.
  - **KEEP:** Document grading logic, explicit failure states (\`RETRIEVAL_WEAK\`, \`EVIDENCE_INSUFFICIENT\`).
  - **ADAPT:** Implement as a pure function wrapper around retrieval calls.

### D. Self-Improving Skill Optimizer
- **Current Purpose:** ADK/FastAPI loop that mutates skills and accepts based on eval pass-rate.
- **Math Node Role:** Iterative capability generation for Agent 003. If a generated capability fails verification (Agent 006), this loop attempts a targeted fix.
- **Knowledge Substrate Interaction:** Writes rejected candidates and version histories.
- **Runtime Interaction:** **NONE.** Candidates are strictly isolated until registered.
- **Decisions:**
  - **REJECT:** FastAPI, ADK runner overhead.
  - **KEEP:** "One change per round" mutation strategy, Keep-Best gate.
  - **ADAPT:** Bind the "Keep-Best" signal directly to the deterministic results of Agent 006, not an LLM judge.

### E. Trust-Gate Audit Team
- **Current Purpose:** SHA-256 hash-chained audit trail and trust-score gating.
- **Math Node Role:** Cryptographic provenance and registration safeguarding for Agents 002, 005, and 007. Ensures no unverified code enters the runtime.
- **Knowledge Substrate Interaction:** Writes immutable, tamper-evident provenance chains.
- **Runtime Interaction:** **NONE.** The runtime only checks the final boolean "is Registered" flag.
- **Decisions:**
  - **REJECT:** Streamlit, external scalar trust providers.
  - **KEEP:** Gate-before-act decorator, SHA-256 ledger format.
  - **ADAPT:** Use the hash chain to freeze capability versions (v1 -> v2) immutably.

---

## 2. Integration Architecture

### A. Combined Agent + Skill Architecture

\`\`\`text
                         MATH NODE
                            │
             ┌──────────────┴──────────────┐
             │                             │
             ▼                             ▼
       MATH RUNTIME                    AGENT PLANE (Orchestrated by 007)
       (Deterministic)                     │
             │                             ├─ 001 Discovery
       parse / route                       ├─ 002 Validation ── (Skill E: Trust Gate)
       execute                             ├─ 003 Construction ─ (Skill D: Optimizer)
       known capability                    ├─ 004 Integration ── (Skill B: Graph RAG)
             │                             ├─ 005 Knowledge ──── (Skill E: Audit Trail)
             │                             └─ 006 Verification
             │                                     │
             │                              [Shared Skills]
             │                              - Skill A: Agentic Math RAG
             │                              - Skill C: Corrective RAG
             │                                     │
             └──────────────┬──────────────┴───────┘
                            ▼
                    KNOWLEDGE SUBSTRATE
                 (Registry + OKF + Hash Ledger)
\`\`\`

### B. Dependency Map
- **Agent 001:** \`agentic-math-rag\` (lookup rules), \`corrective-rag\` (ensure quality).
- **Agent 002:** \`trust-gate-audit\` (validate requirement sanity).
- **Agent 003:** \`agentic-math-rag\`, \`corrective-rag\`, \`self-improving-optimizer\` (build/fix loop).
- **Agent 004:** \`knowledge-graph-rag\` (bind dependencies).
- **Agent 005:** \`knowledge-graph-rag\`, \`trust-gate-audit\` (write immutable history).
- **Agent 006:** \`agentic-math-rag\` (lookup test cases), \`trust-gate-audit\` (seal verification).
- **Agent 007:** \`trust-gate-audit\` (gate workflow steps).

### C. Runtime Boundary
The Math Runtime remains **completely isolated**. 
\`REQUEST -> PARSE -> ROUTE (Known) -> EXECUTE (Deterministic) -> RESULT\`
At no point does this path invoke RAG, Graph traversal, Optimizers, or Audit chains.

### D. Capability Development Sequence
1. **001 (Discovery):** Uses *Skill A + C* to find the definition of "differentiation".
2. **002 (Validation):** Uses *Skill E* to verify the requirement is safe.
3. **003 (Construction):** Uses *Skill D* to iteratively write TypeScript code for the power rule.
4. **006 (Verification):** Runs deterministic tests against the code. If failed, loops back to 003.
5. **004 (Integration):** Uses *Skill B* to map dependency on \`expression.parse\`.
6. **005 (Knowledge):** Uses *Skill E* to hash-chain the provenance and commit to OKF.
7. **007 (Orchestration):** Registers the capability for the Runtime.

### E. Minimal Implementation Plan
1. **The Hash Ledger (Skill E):** Implement the basic SHA-256 provenance tracker first.
2. **The RAG Stubs (Skills A, B, C):** Implement simple mock functions for retrieval that return structured axioms without needing Qdrant/Neo4j.
3. **The Optimizer Loop (Skill D):** Implement a simple \`while(!verified)\` loop connecting Agent 003 and Agent 006.
4. **Agent Integration:** Plug these functions into the existing 001-007 agents.

### F. First End-to-End Test
**Step 1:** \`differentiate(x² + 3x + 1)\`
- Runtime fails -> Agent Plane triggered.
- 001 looks up rules (Skill A). 003 builds candidate. 006 verifies. 005 seals hash (Skill E). Registration completes.

**Step 2:** \`differentiate(4x³ - 7x² + 2)\`
- Runtime succeeds immediately -> Fast path execution.
- Proof that Agent Plane is bypassed and capability is durable.
`;

export default function FiveSkillIntegrationAudit() {
  const downloadMarkdown = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'five-skill-integration-audit.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 2.9 }}
      className="w-full max-w-5xl mx-auto px-4 pb-32 font-sans mt-8"
    >
      <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-6 md:p-10 backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-6 mb-8">
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl md:text-2xl font-medium text-zinc-100 tracking-wide">Five-Skill Integration Audit</h2>
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
