import { motion } from 'motion/react';
import { AlertCircle, Search, FileText } from 'lucide-react';

const content = `
# SOURCE INGESTION BLOCKED

The required source artifacts for **Agents 001–007** are not visible to the coding workspace or chat.

**Update:** We received some files in the chat, but they appear to be standard React/Vite boilerplate files (\`package.json\`, \`index.html\`, \`tsconfig.json\`), not the actual source code for Agent 001 (Requirement / Discovery).

**Required artifacts:**
- Agents 001–007 (Source code logic, e.g., \`.ts\`, \`.py\`, etc.)
- Five reference skills

**Workspace search completed:**
- Executed comprehensive find commands across root (/) and /app/applet.
- Searched for identifying terms: agent001, validator, rag, optimizer, trust-gate.
- Filtered out dependencies (node_modules, etc).
- Result: 0 matching source files found in the filesystem.

**CHAT/UPLOAD VISIBILITY:**
- **Agents 001:** NOT AVAILABLE (Received boilerplate instead of source)
- **Agent 002:** PARTIAL (Received metadata, boilerplate, and JSON schema, no source logic)
- **Agent 003:** PARTIAL (Received metadata, boilerplate, and System Instructions, no source logic)
- **Agent 004:** NOT AVAILABLE (Received boilerplate instead of source)
- **Agent 005:** NOT AVAILABLE (Received boilerplate instead of source)
- **Agents 006–007:** NOT AVAILABLE (Received boilerplate instead of source)
- **Five reference skills:** AVAILABLE (Provided in chat)

**WORKSPACE FILESYSTEM VISIBILITY:**
- **Agents 001–007:** NOT AVAILABLE
- **Five reference skills:** NOT AVAILABLE

| Artifact                       | Found? | Exact Path / Location | File Type |
|--------------------------------|--------|-----------------------|-----------|
| Agent 001                      | No     | Chat Upload           | Boilerplate |
| Agent 002                      | No     | Chat Upload           | JSON Schema & Boilerplate |
| Agent 003                      | No     | Chat Upload           | System Instructions & Boilerplate |
| Agent 004                      | No     | Chat Upload           | Boilerplate |
| Agent 005                      | No     | Chat Upload           | Boilerplate |
| Agent 006                      | No     | Chat Upload           | Boilerplate |
| Agent 007                      | No     | Chat Upload           | Boilerplate |
| agentic-math-rag               | Yes    | Chat Upload           | Markdown  |
| knowledge-graph-rag            | Yes    | Chat Upload           | Markdown  |
| corrective-rag                 | Yes    | Chat Upload           | Markdown  |
| self-improving-skill-optimizer | Yes    | Chat Upload           | Markdown  |
| trust-gate-audit-team          | Yes    | Chat Upload           | Markdown  |

**Next required action:**
Make the actual source files for Agents 001-007 available to the workspace/project.
`;

export default function SourceIngestionGate() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 3.3 }}
      className="w-full max-w-5xl mx-auto px-4 pb-32 font-sans mt-8"
    >
      <div className="bg-red-950/40 border border-red-500/50 rounded-2xl p-6 md:p-10 backdrop-blur-md">
        <div className="flex items-center gap-3 border-b border-red-500/30 pb-6 mb-8">
          <AlertCircle className="w-8 h-8 text-red-500" />
          <h2 className="text-xl md:text-2xl font-medium text-red-100 tracking-wide">Source Ingestion Gate</h2>
        </div>

        <div className="text-red-200/90 text-sm leading-relaxed font-mono whitespace-pre-wrap overflow-x-auto markdown-body">
          {content}
        </div>
      </div>
    </motion.div>
  );
}
