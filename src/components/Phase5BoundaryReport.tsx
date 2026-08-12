import { motion } from 'motion/react';
import { ShieldCheck, Server, AlertCircle } from 'lucide-react';

export default function Phase5BoundaryReport() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto px-4 pb-12 font-sans mt-8"
    >
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 md:p-10">
        <div className="flex items-center gap-3 border-b border-zinc-800 pb-6 mb-8">
          <ShieldCheck className="w-8 h-8 text-indigo-400" />
          <h2 className="text-xl md:text-2xl font-medium text-zinc-100 tracking-wide">MATH NODE — PHASE 5 KERNEL & BOUNDARY VALIDATION REPORT</h2>
        </div>

        <div className="space-y-10 text-zinc-300 text-sm leading-relaxed">
          
          <section>
            <h3 className="text-lg font-semibold text-zinc-100 mb-4 flex items-center gap-2">
              <Server className="w-5 h-5 text-indigo-500" /> Math Kernel State
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-zinc-900 p-3 rounded border border-zinc-800">
                <span className="text-zinc-500 block mb-1">AST & Parser</span>
                <span className="text-emerald-400">IMPLEMENTED</span>
              </div>
              <div className="bg-zinc-900 p-3 rounded border border-zinc-800">
                <span className="text-zinc-500 block mb-1">Normalizer & Simplifier</span>
                <span className="text-emerald-400">IMPLEMENTED</span>
              </div>
              <div className="bg-zinc-900 p-3 rounded border border-zinc-800">
                <span className="text-zinc-500 block mb-1">Evaluator</span>
                <span className="text-emerald-400">IMPLEMENTED</span>
              </div>
              <div className="bg-zinc-900 p-3 rounded border border-zinc-800">
                <span className="text-zinc-500 block mb-1">calculus.differentiate</span>
                <span className="text-emerald-400">IMPLEMENTED & VERIFIED</span>
              </div>
              <div className="bg-zinc-900 p-3 rounded border border-zinc-800">
                <span className="text-zinc-500 block mb-1">Capability Registry</span>
                <span className="text-emerald-400">IMPLEMENTED</span>
              </div>
              <div className="bg-zinc-900 p-3 rounded border border-zinc-800">
                <span className="text-zinc-500 block mb-1">OKF Substrate</span>
                <span className="text-emerald-400">IMPLEMENTED</span>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-zinc-100 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" /> Boundary Validations
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-zinc-900/50 border border-zinc-800 rounded">
                <div className="font-semibold text-zinc-200">1. Known capability does not invoke AgentPlane</div>
                <div className="text-emerald-400 font-mono text-xs mt-1">VERIFIED (Fast Path bypasses Agent Plane completely)</div>
              </div>
              <div className="p-3 bg-zinc-900/50 border border-zinc-800 rounded">
                <div className="font-semibold text-zinc-200">2. Known capability does not invoke OKF retrieval</div>
                <div className="text-emerald-400 font-mono text-xs mt-1">VERIFIED (Registry handles availability check)</div>
              </div>
              <div className="p-3 bg-zinc-900/50 border border-zinc-800 rounded">
                <div className="font-semibold text-zinc-200">3. Known capability does not invoke RAG</div>
                <div className="text-emerald-400 font-mono text-xs mt-1">VERIFIED</div>
              </div>
              <div className="p-3 bg-zinc-900/50 border border-zinc-800 rounded">
                <div className="font-semibold text-zinc-200">4. Unknown capability produces UnsupportedRequirement</div>
                <div className="text-emerald-400 font-mono text-xs mt-1">VERIFIED</div>
              </div>
              <div className="p-3 bg-zinc-900/50 border border-zinc-800 rounded">
                <div className="font-semibold text-zinc-200">5. Unverified capability cannot enter CapabilityRegistry</div>
                <div className="text-emerald-400 font-mono text-xs mt-1">VERIFIED (MathVerifier guards registration)</div>
              </div>
              <div className="p-3 bg-zinc-900/50 border border-zinc-800 rounded">
                <div className="font-semibold text-zinc-200">6. AVAILABLE is reachable only after verification</div>
                <div className="text-emerald-400 font-mono text-xs mt-1">VERIFIED</div>
              </div>
              <div className="p-3 bg-zinc-900/50 border border-zinc-800 rounded">
                <div className="font-semibold text-zinc-200">7. OKF stores provenance independently from registry</div>
                <div className="text-emerald-400 font-mono text-xs mt-1">VERIFIED (OKF retains VerificationRecord/provenance)</div>
              </div>
              <div className="p-3 bg-zinc-900/50 border border-zinc-800 rounded">
                <div className="font-semibold text-zinc-200">8. CapabilityRegistry contains executable metadata, not knowledge</div>
                <div className="text-emerald-400 font-mono text-xs mt-1">VERIFIED</div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-zinc-100 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" /> Agent Plane Status
            </h3>
            <div className="overflow-x-auto rounded-lg border border-zinc-800">
              <table className="w-full text-left text-sm text-zinc-400">
                <thead className="text-xs uppercase bg-zinc-900 text-zinc-500">
                  <tr>
                    <th className="px-4 py-3 border-b border-zinc-800">Component</th>
                    <th className="px-4 py-3 border-b border-zinc-800">State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50 font-mono text-xs">
                  <tr className="hover:bg-zinc-900/50"><td className="px-4 py-3 text-zinc-300">AgentPlaneAdapter</td><td className="px-4 py-3 text-amber-400">SCAFFOLD</td></tr>
                  <tr className="hover:bg-zinc-900/50"><td className="px-4 py-3 text-zinc-300">Agent001RequirementDiscovery</td><td className="px-4 py-3 text-red-400">UNAVAILABLE</td></tr>
                  <tr className="hover:bg-zinc-900/50"><td className="px-4 py-3 text-zinc-300">Agent002Validator</td><td className="px-4 py-3 text-red-400">UNAVAILABLE</td></tr>
                  <tr className="hover:bg-zinc-900/50"><td className="px-4 py-3 text-zinc-300">Agent003CapabilityBuilder</td><td className="px-4 py-3 text-red-400">UNAVAILABLE</td></tr>
                  <tr className="hover:bg-zinc-900/50"><td className="px-4 py-3 text-zinc-300">Agent004RelationshipIntegration</td><td className="px-4 py-3 text-red-400">UNAVAILABLE</td></tr>
                  <tr className="hover:bg-zinc-900/50"><td className="px-4 py-3 text-zinc-300">Agent005KnowledgeRepresentation</td><td className="px-4 py-3 text-red-400">UNAVAILABLE</td></tr>
                  <tr className="hover:bg-zinc-900/50"><td className="px-4 py-3 text-zinc-300">Agent006Verification</td><td className="px-4 py-3 text-red-400">UNAVAILABLE</td></tr>
                  <tr className="hover:bg-zinc-900/50"><td className="px-4 py-3 text-zinc-300">Agent007Orchestrator</td><td className="px-4 py-3 text-red-400">UNAVAILABLE</td></tr>
                  <tr className="hover:bg-zinc-900/50"><td className="px-4 py-3 text-zinc-300">5 Reference RAG/Agent Skills</td><td className="px-4 py-3 text-red-400">UNAVAILABLE</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-zinc-400 text-xs">
              <strong className="text-amber-400">NOTE:</strong> The actual heuristic intelligence remains unavailable. The Math Runtime correctly halts execution on <code>UnsupportedRequirement</code> and waits for the Agent Plane adapter to process it, proving the isolation boundary works.
            </p>
          </section>

        </div>
      </div>
    </motion.div>
  );
}
