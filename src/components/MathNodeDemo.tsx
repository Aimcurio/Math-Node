import React, { useState, useRef, useEffect } from 'react';
import { MathRuntime } from '../NOESIS/MathRuntime';
import { CapabilityRegistry } from '../NOESIS/CapabilityRegistry';
import { OKF } from '../NOESIS/OKF';
import { AgentPlaneAdapter } from '../NOESIS/AgentPlane';
import { Play, RotateCcw, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { MathResult } from '../NOESIS/Types';

export default function MathNodeDemo() {
  const [logs, setLogs] = useState<string[]>([]);
  const [latestResult, setLatestResult] = useState<(MathResult & { request: string }) | null>(null);
  const runtimeRef = useRef<MathRuntime | null>(null);

  const initRuntime = () => {
    const registry = new CapabilityRegistry();
    const okf = new OKF();
    const agentPlane = new AgentPlaneAdapter(okf, registry);
    runtimeRef.current = new MathRuntime(registry, agentPlane);
    setLogs(["[System] Math Node Initialized. Deterministic foundations seeded."]);
    setLatestResult(null);
  };

  useEffect(() => {
    initRuntime();
  }, []);

  const runTest = async (testNumber: number) => {
    if (!runtimeRef.current) return;
    
    // Intercept console.log specifically during the test
    const originalLog = console.log;
    const capturedLogs: string[] = [];
    
    console.log = (...args: any[]) => {
      originalLog(...args);
      const msg = args.map(a => typeof a === 'string' ? a : JSON.stringify(a)).join(' ');
      capturedLogs.push(msg);
    };

    try {
      if (testNumber === 1) {
        const reqStr = 'differentiate(x² + 3x + 1)';
        const res = await runtimeRef.current.execute({
          operation: 'calculus.differentiation',
          args: ['x² + 3x + 1']
        });
        setLatestResult({ ...res, request: reqStr });
      } else if (testNumber === 2) {
        const reqStr = 'differentiate(4x³ - 7x² + 2)';
        const res = await runtimeRef.current.execute({
          operation: 'calculus.differentiation',
          args: ['4x³ - 7x² + 2']
        });
        setLatestResult({ ...res, request: reqStr });
      }
    } finally {
      console.log = originalLog;
      setLogs(prev => [...prev, ...capturedLogs]);
    }
  };

  const reset = () => {
    initRuntime();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full max-w-5xl mx-auto px-4 font-sans mt-8 mb-8 flex flex-col gap-6"
    >
      <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-6 md:p-10 backdrop-blur-md relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-6 mb-8 relative z-10">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl md:text-2xl font-medium text-zinc-100 tracking-wide">
                Math Node End-to-End Test Harness
              </h2>
            </div>
            <p className="text-sm text-zinc-400 mt-1 ml-9">
              Verifiable Integration Contracts
            </p>
          </div>
          <button 
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-sm transition-colors border border-zinc-700"
          >
            <RotateCcw className="w-4 h-4" /> Reset State
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 relative z-10">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 flex flex-col items-start gap-4 hover:border-purple-500/30 transition-colors group">
            <div>
              <h3 className="text-sm font-semibold text-zinc-200 mb-2 group-hover:text-purple-400 transition-colors">Test A: Unknown Capability</h3>
              <p className="text-xs text-zinc-400 font-mono bg-zinc-950 px-2 py-1.5 rounded border border-zinc-800/50">differentiate(x² + 3x + 1)</p>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Triggers the Agent Plane capability development workflow. Agents build, verify, and register the capability to OKF.
            </p>
            <button 
              onClick={() => runTest(1)}
              className="mt-auto flex items-center gap-2 px-4 py-2.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-lg text-sm font-medium transition-colors border border-purple-500/20 w-full justify-center"
            >
              <Play className="w-4 h-4" /> Execute Test A
            </button>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 flex flex-col items-start gap-4 hover:border-emerald-500/30 transition-colors group">
            <div>
              <h3 className="text-sm font-semibold text-zinc-200 mb-2 group-hover:text-emerald-400 transition-colors">Test B: Known Capability</h3>
              <p className="text-xs text-zinc-400 font-mono bg-zinc-950 px-2 py-1.5 rounded border border-zinc-800/50">differentiate(4x³ - 7x² + 2)</p>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Immediately executes on the deterministic fast path. The Agent Plane is completely bypassed.
            </p>
            <button 
              onClick={() => runTest(2)}
              className="mt-auto flex items-center gap-2 px-4 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-medium transition-colors border border-emerald-500/20 w-full justify-center"
            >
              <Play className="w-4 h-4" /> Execute Test B
            </button>
          </div>
        </div>

        {latestResult && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-8 bg-zinc-900/50 border border-zinc-700/50 rounded-xl p-6 relative z-10"
          >
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Execution Observability</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8 text-sm">
              <div>
                <span className="text-zinc-500 block mb-1 text-xs">Request</span>
                <span className="font-mono text-zinc-200">{latestResult.request}</span>
              </div>
              <div>
                <span className="text-zinc-500 block mb-1 text-xs">Result</span>
                <span className="font-mono text-emerald-400 font-medium">{latestResult.result}</span>
              </div>
              <div>
                <span className="text-zinc-500 block mb-1 text-xs">Route</span>
                <span className={`font-mono ${latestResult.route === 'FAST PATH' ? 'text-emerald-400' : 'text-purple-400'}`}>
                  {latestResult.route}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block mb-1 text-xs">Agent Plane Invoked</span>
                <span className="font-mono text-zinc-200">{latestResult.agentPlaneInvoked ? 'YES' : 'NO'}</span>
              </div>
              <div>
                <span className="text-zinc-500 block mb-1 text-xs">Capability Version</span>
                <span className="font-mono text-zinc-200">{latestResult.capabilityVersion ? `v${latestResult.capabilityVersion}` : 'N/A'}</span>
              </div>
              <div>
                <span className="text-zinc-500 block mb-1 text-xs">Execution Time</span>
                <span className="font-mono text-zinc-200">{latestResult.executionTimeMs?.toFixed(2)} ms</span>
              </div>
            </div>
          </motion.div>
        )}

        <div className="bg-[#0c0c0e] border border-zinc-800/80 rounded-xl overflow-hidden flex flex-col relative z-10 shadow-2xl">
          <div className="bg-zinc-900/80 px-4 py-2 border-b border-zinc-800/80 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
            </div>
            <span className="text-[10px] font-medium text-zinc-500 ml-2 font-mono uppercase tracking-widest">Math Node Output Log</span>
          </div>
          <div className="p-4 md:p-6 font-mono text-sm leading-relaxed overflow-y-auto max-h-[500px] text-zinc-300 flex flex-col gap-1.5">
            {logs.length === 0 ? (
              <span className="text-zinc-600 italic">Waiting for execution...</span>
            ) : (
              logs.map((log, index) => {
                let colorClass = "text-zinc-300";
                if (log.includes("[Math Runtime]")) colorClass = "text-emerald-400/90";
                if (log.includes("[Agent Plane]")) colorClass = "text-purple-400/90";
                if (log.includes("[Agent 00")) colorClass = "text-blue-400/90";
                if (log.includes("UNSUPPORTED")) colorClass = "text-red-400/90 font-medium";
                if (log.includes("AVAILABLE")) colorClass = "text-amber-400/90 font-medium";
                if (log.includes("STATUS: INTEGRATION SCAFFOLD")) colorClass = "text-amber-500/90 font-bold bg-amber-500/10 px-2 py-0.5 rounded inline-block";
                
                if (log.startsWith("\\n")) {
                   return (
                     <React.Fragment key={index}>
                       <br />
                       <div className={`${colorClass}`}>{log.replace("\\n", "")}</div>
                     </React.Fragment>
                   );
                }
                return (
                  <div key={index} className={colorClass}>
                    {log}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
