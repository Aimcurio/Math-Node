import { motion } from 'motion/react';
import { Layers, ShieldAlert, Cpu, Network, Zap, Clock, ShieldCheck, Wrench } from 'lucide-react';

export default function SystemDetails() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 pb-20 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2.1 }}
        className="mb-12"
      >
        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <Network className="w-6 h-6 text-zinc-400" />
            <h2 className="text-xl font-medium text-zinc-100 tracking-wide">Core System Boundaries</h2>
          </div>
          <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
            <strong className="text-zinc-300 font-medium">Rule of Thumb:</strong> If it requires heuristics, web scraping, code generation, or symbolic deduction for an unsupported domain, it goes to the <span className="text-purple-400">Agent Plane</span>. If it maps to an existing AST node handler or a compiled primitive, it stays in the <span className="text-emerald-400">Runtime</span>.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-xs uppercase tracking-wider text-zinc-500">
                  <th className="pb-3 pr-4 font-medium">Component</th>
                  <th className="pb-3 pr-4 font-medium">Nature</th>
                  <th className="pb-3 pr-4 font-medium">Latency Profile</th>
                  <th className="pb-3 font-medium">Primary Responsibility</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-zinc-800/50 group hover:bg-zinc-800/20 transition-colors">
                  <td className="py-4 pr-4 text-emerald-400 font-medium flex items-center gap-2">
                    <Cpu className="w-4 h-4" /> Math Runtime
                  </td>
                  <td className="py-4 pr-4 text-zinc-300">Deterministic / Local</td>
                  <td className="py-4 pr-4 text-zinc-400 font-mono text-xs">O(1) to O(N) execution</td>
                  <td className="py-4 text-zinc-400">Executes known math via compiled/kernel primitives.</td>
                </tr>
                <tr className="border-b border-zinc-800/50 group hover:bg-zinc-800/20 transition-colors">
                  <td className="py-4 pr-4 text-purple-400 font-medium flex items-center gap-2">
                    <Layers className="w-4 h-4" /> Agent Plane
                  </td>
                  <td className="py-4 pr-4 text-zinc-300">Heuristic / Generative</td>
                  <td className="py-4 pr-4 text-zinc-400 font-mono text-xs">High latency (Async)</td>
                  <td className="py-4 text-zinc-400">Synthesizes new capabilities, writes tests, registers code.</td>
                </tr>
                <tr className="group hover:bg-zinc-800/20 transition-colors">
                  <td className="py-4 pr-4 text-sky-400 font-medium flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> Verification Mesh
                  </td>
                  <td className="py-4 pr-4 text-zinc-300">Layered (Build/Reg/Runtime)</td>
                  <td className="py-4 pr-4 text-zinc-400 font-mono text-xs">Variable</td>
                  <td className="py-4 text-zinc-400">Enforces correctness invariants based on operation risk.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2.3 }}
      >
        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <ShieldAlert className="w-6 h-6 text-zinc-400" />
            <h2 className="text-xl font-medium text-zinc-100 tracking-wide">Verification Layer Breakdown</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/50 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500/50 to-transparent"></div>
              <h3 className="text-amber-400 font-medium text-sm mb-3 flex items-center gap-2 tracking-wide">
                <Wrench className="w-4 h-4" /> BUILD-TIME
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Comprehensive property tests, symbolic regression checks, and static analysis for newly generated capability modules.
              </p>
            </div>
            
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/50 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500/50 to-transparent"></div>
              <h3 className="text-sky-400 font-medium text-sm mb-3 flex items-center gap-2 tracking-wide">
                <Layers className="w-4 h-4" /> REGISTRATION-TIME
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Contract validation and dependency checks to ensure the module safely binds to the runtime interface without breaking existing AST routers.
              </p>
            </div>
            
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/50 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/50 to-transparent"></div>
              <h3 className="text-emerald-400 font-medium text-sm mb-3 flex items-center gap-2 tracking-wide">
                <Zap className="w-4 h-4" /> RUNTIME (LIGHTWEIGHT)
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Cheap type checking, bounds validation, and optional randomized invariant sampling for high-risk or newly minted operations.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
