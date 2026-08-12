/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import AgentFlow from './components/AgentFlow';
import SystemDetails from './components/SystemDetails';
import SpecSheet from './components/SpecSheet';
import AgentIntegrationAudit from './components/AgentIntegrationAudit';
import FiveSkillIntegrationAudit from './components/FiveSkillIntegrationAudit';
import CodeLevelIntegrationAudit from './components/CodeLevelIntegrationAudit';
import MathNodeDemo from './components/MathNodeDemo';
import IntegrationReadinessReport from './components/IntegrationReadinessReport';
import Phase3IntegrationReport from './components/Phase3IntegrationReport';
import Phase4IntegrationAudit from './components/Phase4IntegrationAudit';
import Phase5MathKernel from './components/Phase5MathKernel';
import Phase5BoundaryReport from './components/Phase5BoundaryReport';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-zinc-800 flex flex-col items-center p-4 relative overflow-y-auto">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-zinc-950 z-0 pointer-events-none"></div>
      <div className="relative z-10 w-full">
        <Phase5BoundaryReport />
        <Phase5MathKernel />
        <Phase4IntegrationAudit />
        <Phase3IntegrationReport />
        <MathNodeDemo />
        <IntegrationReadinessReport />
        <AgentFlow />
        <SystemDetails />
        <SpecSheet />
        <AgentIntegrationAudit />
        <FiveSkillIntegrationAudit />
        <CodeLevelIntegrationAudit />
      </div>
    </div>
  );
}
