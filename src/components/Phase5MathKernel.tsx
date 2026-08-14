import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, Database, Shield, Zap, FileCode, Play, RotateCcw } from 'lucide-react';
import { MathRuntime } from '../NOESIS/MathRuntime';
import { CapabilityRegistry } from '../NOESIS/CapabilityRegistry';
import { ProviderRegistry } from '../NOESIS/ProviderRegistry';
import { AgentPlaneAdapter } from '../NOESIS/AgentPlane';
import { OKF } from '../NOESIS/OKF';
import { MathVerifier } from '../NOESIS/MathVerifier';

export default function Phase5MathKernel() {
  const [logs, setLogs] = useState<string[]>([]);
  const runtimeRef = useRef<{ runtime: MathRuntime, verifier: MathVerifier } | null>(null);

  const initRuntime = () => {
    const providers = new ProviderRegistry();
    const registry = new CapabilityRegistry(providers);
    const okf = new OKF();
    const agentPlane = new AgentPlaneAdapter(okf, registry, providers);
    const runtime = new MathRuntime(registry, providers);
    const verifier = new MathVerifier(registry, providers, okf);
    runtimeRef.current = { runtime, verifier };
    setLogs(["[System] Phase 5 Math Kernel Initialized."]);
  };

  useEffect(() => {
    initRuntime();
  }, []);

  const runTestBefore = async () => {
    if (!runtimeRef.current) return;
    const { runtime } = runtimeRef.current;
    const res = await runtime.execute({ operation: 'calculus.differentiation', args: ['x^2 + 3*x + 1'] });
    setLogs(prev => [...prev, `Test: differentiate(x^2 + 3*x + 1) BEFORE registration -> ${res.status}`]);
  };

  const runRegistration = async () => {
    if (!runtimeRef.current) return;
    const { verifier } = runtimeRef.current;
    setLogs(prev => [...prev, "[Verifier] Running Verification Suite for calculus.differentiation..."]);
    const verRecord = await verifier.verifyAndRegisterDifferentiation();
    if (verRecord.passed) {
      setLogs(prev => [...prev, "[Verifier] Verification PASSED. Capability registered as AVAILABLE."]);
    } else {
      setLogs(prev => [...prev, "[Verifier] Verification FAILED."]);
    }
  };

  const runTestAfter1 = async () => {
    if (!runtimeRef.current) return;
    const { runtime } = runtimeRef.current;
    const res = await runtime.execute({ operation: 'calculus.differentiation', args: ['x^2 + 3*x + 1'] });
    setLogs(prev => [...prev, `Test: differentiate(x^2 + 3*x + 1) AFTER registration -> ${res.result} (${res.status}, ${res.route})`]);
  };

  const runTestAfter2 = async () => {
    if (!runtimeRef.current) return;
    const { runtime } = runtimeRef.current;
    const res = await runtime.execute({ operation: 'calculus.differentiation', args: ['4*x^3 - 7*x^2 + 2'] });
    setLogs(prev => [...prev, `Test: differentiate(4*x^3 - 7*x^2 + 2) AFTER registration -> ${res.result} (${res.status}, ${res.route})`]);
  };
  
  const runUnsupported = async () => {
    if (!runtimeRef.current) return;
    const { runtime } = runtimeRef.current;
    const res = await runtime.execute({ operation: 'calculus.integration', args: ['x^2'] });
    setLogs(prev => [...prev, `Test: integrate(x^2) -> ${res.status}`]);
    if (res.status === 'UNSUPPORTED') {
       setLogs(prev => [...prev, `Produced UnsupportedRequirement: ${JSON.stringify((res.result as any).requiredCapabilities)}`]);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto px-4 pb-12 font-sans mt-8"
    >
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 md:p-10">
        <div className="flex items-center gap-3 border-b border-zinc-800 pb-6 mb-8">
          <Terminal className="w-8 h-8 text-indigo-400" />
          <h2 className="text-xl md:text-2xl font-medium text-zinc-100 tracking-wide">MATH NODE — PHASE 5 MATHEMATICAL KERNEL</h2>
        </div>

        <div className="space-y-10 text-zinc-300 text-sm leading-relaxed">
          
          <section>
            <h3 className="text-lg font-semibold text-zinc-100 mb-4 flex items-center gap-2">
              <span className="text-indigo-500">1.</span> Runtime Implementation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-zinc-900/50 p-4 rounded border border-zinc-800">
                <h4 className="font-semibold text-zinc-200 mb-2 flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-indigo-400" /> AST & Parser
                </h4>
                <p className="text-zinc-400">
                  Minimal typed Abstract Syntax Tree (<code>Expr</code>) representing Numbers, Variables, Add, Subtract, Multiply, Divide, and Power. The <code>parse()</code> function uses recursive descent to produce deterministic ASTs.
                </p>
              </div>
              <div className="bg-zinc-900/50 p-4 rounded border border-zinc-800">
                <h4 className="font-semibold text-zinc-200 mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" /> Simplifier & Normalizer
                </h4>
                <p className="text-zinc-400">
                  <code>simplify()</code> executes deterministic transformations (e.g., <code>0 + x → x</code>, <code>1 * x → x</code>). <code>normalize()</code> ensures a canonical structural layout for deterministic equality.
                </p>
              </div>
              <div className="bg-zinc-900/50 p-4 rounded border border-zinc-800">
                <h4 className="font-semibold text-zinc-200 mb-2 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" /> Evaluator
                </h4>
                <p className="text-zinc-400">
                  <code>evaluate()</code> executes the AST deterministically given a set of variable bindings.
                </p>
              </div>
              <div className="bg-zinc-900/50 p-4 rounded border border-zinc-800">
                <h4 className="font-semibold text-zinc-200 mb-2 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-purple-400" /> Differentiation
                </h4>
                <p className="text-zinc-400">
                  <code>calculus.differentiation</code> performs exact structural AST transformation using deterministic calculus rules (power rule, product rule, quotient rule) before simplification.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-zinc-100 mb-4 flex items-center gap-2">
              <span className="text-indigo-500">2.</span> Capability Registry
            </h3>
            <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-lg font-mono text-xs">
              <div className="text-emerald-400 mb-2">// Runtime availability index</div>
              <div className="text-zinc-300">
                CapabilityRegistry.has(<span className="text-amber-300">"calculus.differentiation"</span>)<br/>
                <span className="text-zinc-500">→ returns true only if status === "AVAILABLE"</span>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-zinc-100 mb-4 flex items-center gap-2">
              <span className="text-indigo-500">3.</span> OKF
            </h3>
            <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-lg">
              <p className="text-zinc-400 mb-2">The OKF correctly implements explicit representation of epistemic context for <code>calculus.differentiation</code>:</p>
              <ul className="list-disc list-inside space-y-1 text-zinc-300 font-mono text-xs">
                <li><span className="text-indigo-400">Capability Knowledge Record:</span> implementation ID, version, status</li>
                <li><span className="text-indigo-400">Verification Record:</span> stores exact passing AST test results</li>
                <li><span className="text-indigo-400">Provenance:</span> registers Agent 006 (Math Verifier) as the authorizer</li>
                <li><span className="text-indigo-400">Revision info:</span> structured immutability via unique IDs and timestamps</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-zinc-100 mb-4 flex items-center gap-2">
              <span className="text-indigo-500">4.</span> Verification
            </h3>
            <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg flex items-start gap-4">
              <Shield className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
              <div>
                <p className="text-zinc-300 mb-2">
                  <strong>Registration Gate:</strong> <code>calculus.differentiation</code> is explicitly executed against rigorous AST test cases before the system permits a status transition to <code>AVAILABLE</code>.
                </p>
                <div className="bg-zinc-950 p-3 rounded border border-zinc-800 font-mono text-xs text-emerald-400/80 overflow-x-auto whitespace-pre">
{`tests: [
  { test: 'd/dx(x) = 1', passed: true },
  { test: 'd/dx(x^2 + 3*x + 1) = 2*x + 3', passed: true },
  { test: 'd/dx(4*x^3 - 7*x^2 + 2) = 12*x^2 - 14*x', passed: true }
]`}
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-zinc-100 mb-4 flex items-center gap-2">
              <span className="text-indigo-500">5.</span> Architectural Boundary
            </h3>
            <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
              <p className="text-zinc-300 mb-3">
                The <code>MathRuntime</code> now explicitly isolates normal mathematical execution from capability development. When an unknown capability like <code>integrate(x^2)</code> is requested, the runtime halts and returns an <code>UnsupportedRequirement</code>.
              </p>
              <div className="bg-zinc-950 p-3 rounded border border-zinc-800 font-mono text-xs text-amber-400/80 overflow-x-auto whitespace-pre">
{`{
  status: "UNSUPPORTED",
  result: {
    requirementId: "req_12345",
    operation: "integrate",
    requiredCapabilities: ["integrate"]
  },
  route: "CAPABILITY DEVELOPMENT PATH",
  agentPlaneInvoked: false
}`}
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-zinc-100 mb-4 flex items-center gap-2">
              <span className="text-indigo-500">6.</span> Capability Persistence Demo
            </h3>
            <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
              <div className="flex flex-wrap gap-3 mb-6">
                <button onClick={runTestBefore} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded text-xs transition-colors">
                  1. Test BEFORE Registration
                </button>
                <button onClick={runRegistration} className="px-4 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/50 rounded text-xs transition-colors">
                  2. Run Verification & Register
                </button>
                <button onClick={runTestAfter1} className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/50 rounded text-xs transition-colors">
                  3. Test AFTER (Path 1)
                </button>
                <button onClick={runTestAfter2} className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/50 rounded text-xs transition-colors">
                  4. Test AFTER (Path 2)
                </button>
                <button onClick={runUnsupported} className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/50 rounded text-xs transition-colors">
                  5. Test UNSUPPORTED
                </button>
                <button onClick={() => { initRuntime(); setLogs([]); }} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded text-xs transition-colors ml-auto">
                  <RotateCcw className="w-3 h-3 inline mr-1" /> Reset
                </button>
              </div>

              <div className="bg-black p-4 rounded font-mono text-[11px] text-zinc-400 h-64 overflow-y-auto space-y-1 border border-zinc-800">
                {logs.map((log, i) => (
                   <div key={i} className={
                     log.includes('PASSED') ? 'text-emerald-400' :
                     log.includes('UNSUPPORTED') ? 'text-amber-400' :
                     log.includes('FAILED') ? 'text-red-400' :
                     log.startsWith('Test:') ? 'text-zinc-200 font-medium mt-2' : ''
                   }>{log}</div>
                ))}
                {logs.length === 0 && <div className="text-zinc-600 italic">No activity yet. Click the buttons above.</div>}
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
