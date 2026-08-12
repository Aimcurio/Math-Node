import { motion } from 'motion/react';
import { FileText, Download, AlertTriangle } from 'lucide-react';

const markdownContent = `# MATH NODE — AGENT & SKILL CODE-LEVEL INTEGRATION AUDIT

## A. Source Inventory

**Filesystem Audit Completed:** A comprehensive search of the workspace (\`/\`, \`/src\`, and the wider filesystem) confirms that the actual logic source files for Agents 001–007 are **absent**. Only boilerplate artifacts (e.g. \`package.json\`, \`metadata.json\`, \`tsconfig.json\`) and JSON schema outputs have been provided. The implementation logic for the 5 reference skills was uploaded as Markdown files in the chat. Because I am strictly forbidden from hallucinating code, I cannot populate exact file paths and line numbers.

| Component | Exact Path / Location | Entry Point / Logic | Existing Tests | Existing OKF | Existing RAG |
|-----------|-----------------------|---------------------|----------------|--------------|--------------|
| **Agent 001** | Missing | Missing | Missing | Missing | Missing |
| **Agent 002** | \`metadata.json\` (No logic) | Missing | Missing | Missing | Missing |
| **Agent 003** | \`metadata.json\` / Chat System Instructions | Missing | Missing | Missing | Missing |
| **Agent 004** | \`metadata.json\` (No logic) | Missing | Missing | Missing | Missing |
| **Agent 005** | \`metadata.json\` (No logic) | Missing | Missing | Missing | Missing |
| **Agent 006** | \`metadata.json\` (No logic) | Missing | Missing | Missing | Missing |
| **Agent 007** | \`metadata.json\` (No logic) | Missing | Missing | Missing | Missing |
| **agentic-math-rag** | Chat Upload (MD) | \`query_router.py\` (Python) | Missing | None | LlamaIndex / Qdrant / Tavily |
| **knowledge-graph-rag** | Chat Upload (MD) | \`knowledge_graph_rag.py\` (Python) | Missing | None | Neo4j / Ollama |
| **corrective-rag** | Chat Upload (MD) | \`corrective_rag.py\` (Python) | Missing | None | LangGraph / Qdrant / Tavily |
| **self-improving-skill-optimizer** | Chat Upload (MD) | \`adk_optimizer.py\` (Python) | \`adk\` | None | None |
| **trust-gate-audit-team** | Chat Upload (MD) | \`trust_gated_agents.py\` (Python) | Missing | None | JSON hash chain |

## B. Agent Integration Matrix

| Agent | Existing Implementation | Math Node Role | Required Adapter | Required Contract | OKF Interaction | Skill Dependencies | Runtime Boundary |
|-------|-------------------------|----------------|------------------|-------------------|-----------------|--------------------|------------------|
| **001 Discovery** | Missing | Determine capability requirement | Runtime interceptor | \`UnsupportedRequirement\` → \`Gap\` | Retrieve | Math RAG / Corrective RAG | Strictly Outside |
| **002 Validation** | \`ArtifactSchemaV2\` (JSON only) | Gatekeeper for inputs & dependencies | JSON Schema Validator | \`Gap\` → \`ValidationResult\` | Retrieve | Trust-Gate | Strictly Outside |
| **003 Construction**| System Instruction (Text only)| Construct missing capability | LLM code generator | \`Gap\` → \`CandidateCapability\` | Retrieve | Optimizer / Math RAG | Strictly Outside |
| **004 Integration** | Missing | Establish relationships | AST dependency mapper | \`Candidate\` → \`RelationshipGraph\`| Retrieve / Write| Graph RAG | Strictly Outside |
| **005 Knowledge** | Missing | Persist capability knowledge | OKF Data Access Object | \`Metadata\` → \`CommitReceipt\` | Write (Authoritative)| Graph RAG / Trust-Gate | Strictly Outside |
| **006 Verification**| Missing | Mathematical correctness | Sandboxed test runner | \`Candidate\` → \`VerificationResult\`| Retrieve / Write| Math RAG / Corrective RAG | Strictly Outside |
| **007 Orchestrator**| Missing | Coordinate Agent Plane | Agent workflow engine | \`Requirement\` → \`AvailableCapability\`| Retrieve | Trust-Gate | Strictly Outside |

## C. Skill Integration Matrix

| Skill | Original Mechanism | Useful Mechanism | Removed Mechanism | Math Node Adaptation | Agent Consumers | OKF Interaction |
|-------|--------------------|------------------|-------------------|----------------------|-----------------|-----------------|
| **agentic-math-rag** | DSPy + Qdrant + Tavily | Mathematical rule retrieval | Web search (Tavily), Python | Port retrieval to JS/TS OKF client | 001, 003, 006 | Retrieve |
| **knowledge-graph-rag**| Neo4j + Ollama | Relationship multi-hop | Neo4j, Ollama, Python | Direct OKF relation references | 004, 005 | Retrieve |
| **corrective-rag** | LangGraph + Streamlit | Retrieval quality grading | LangGraph, Streamlit, Python | Pure function grading logic | 001, 003, 006 | None |
| **self-improving-optimizer**| Python ADK + FastAPI | Keep-best iteration | ADK, FastAPI, Python | TS deterministic test loop | 003, 006 | None |
| **trust-gate-audit-team**| Python hashlib | SHA-256 hash chaining | Python stdlib | TS \`crypto.subtle\` hashing | 002, 005, 007 | Ledger / Write |

## D. OKF Integration Map

| Agent | OKF Function/Interface | Knowledge Object | Revision/Provenance | Retrieval / Registration |
|-------|------------------------|------------------|---------------------|--------------------------|
| **001** | \`okf.getCapability()\` | Capability Identity | Retrieve latest verified hash | Retrieval |
| **003** | \`okf.getPriorFailures()\`| Failure History | Retrieve failed candidate hashes | Retrieval |
| **004** | \`okf.getDependencies()\`| Relationship Graph | Retrieve verified relations | Retrieval / Registration |
| **005** | \`okf.commit()\` | Capability Implementation| Create new immutable revision | Registration |
| **006** | \`okf.getTests()\` | Verification Evidence | Retrieve test suite | Retrieval / Registration |

## E. Runtime Boundary

The Math Runtime is completely isolated from the Agent Plane.
- **Math Runtime** does NOT depend on Agents, RAG, LLM calls, graph traversal, optimizer loops, or trust-gate workflows.
- The Runtime evaluates AST nodes synchronously against a local registry of \`AvailableCapabilities\`.
- If an operation is missing, the Runtime strictly aborts execution, throwing an \`UnsupportedRequirement\` error to the Agent Plane, and waits.

## F. Capability Lifecycle

| State | Responsible Component | Definition / Gap |
|-------|-----------------------|------------------|
| \`DISCOVERED\` | Agent 001 | Math Runtime threw \`UnsupportedRequirement\`. |
| \`VALIDATED\` | Agent 002 | Requirement structure and inputs are validated. |
| \`BUILDING\` | Agent 003 | Optimizer loop generating candidates. |
| \`INTEGRATED\` | Agent 004 | Dependencies are mapped into the AST graph. |
| \`VERIFIED\` | Agent 006 | Executable tests pass deterministically. |
| \`REGISTERED\` | Agent 005 | Immutably stored in OKF with provenance hash. |
| \`AVAILABLE\` | Agent 007 / Runtime | Registered in Runtime memory for fast-path execution. |

## G. Minimal Adapter Architecture

1. **Math Runtime Interceptor**: A \`try/catch\` block around the AST evaluator that captures unknown operations and emits an \`UnsupportedRequirement\` event.
2. **Agent Plane Queue**: An event listener that triggers Agent 007 upon receiving the event.
3. **OKF Storage Interface**: A pure TS \`Map\` or \`IndexedDB\` backing store mapping operation keys to JS implementation functions and immutable JSON metadata.
4. **Sandboxed Evaluator**: A safe \`new Function()\` or JS sandbox for Agent 006 to run unit tests against Candidate Capabilities before committing.

## H. First Implementation Slice

To prove the architecture without over-engineering:
1. Hardcode \`differentiate()\` as an \`UnsupportedRequirement\`.
2. When the Runtime attempts to execute \`differentiate(x^2 + 3x + 1)\`, it fails and passes the requirement to the Agent Plane.
3. **Agent 003** generates a TS function for polynomial differentiation (bypassing RAG for the slice).
4. **Agent 006** runs a deterministic known-answer test: \`differentiate(x^2) === 2x\`.
5. **Agent 005** registers the validated function in the OKF.
6. The Runtime registry updates.
7. The Runtime automatically re-executes \`differentiate(4x^3 - 7x^2 + 2)\` synchronously via the newly \`AVAILABLE\` fast path.
`;

export default function CodeLevelIntegrationAudit() {
  const downloadMarkdown = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code-level-integration-audit.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 3.1 }}
      className="w-full max-w-5xl mx-auto px-4 pb-32 font-sans mt-8"
    >
      <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-6 md:p-10 backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-6 mb-8">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl md:text-2xl font-medium text-zinc-100 tracking-wide">Code-Level Integration Directive</h2>
          </div>
          <button 
            onClick={downloadMarkdown}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-sm transition-colors border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600"
          >
            <Download className="w-4 h-4" /> Export MD
          </button>
        </div>
        
        <div className="mb-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div className="text-sm text-blue-200/80 leading-relaxed">
            <strong className="text-blue-400">Filesystem Check:</strong> The source code for Agents 001-007 has not been detected in the workspace. This document provides the strict architectural bounds required for integration once the code is provided.
          </div>
        </div>

        <div className="text-zinc-300 text-sm leading-relaxed font-mono whitespace-pre-wrap overflow-x-auto">
          {markdownContent}
        </div>
      </div>
    </motion.div>
  );
}
