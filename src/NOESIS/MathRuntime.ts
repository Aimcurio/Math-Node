import { MathRequest, MathResult, UnsupportedRequirement } from "./Types";
import { CapabilityRegistry } from "./CapabilityRegistry";
import { AgentPlaneAdapter } from "./AgentPlane";
import { parse, normalize, evaluate, simplify } from "./MathEngine";

export class MathRuntime {
  constructor(
    private registry: CapabilityRegistry,
    private agentPlane: AgentPlaneAdapter
  ) {
    // Seed the runtime with deterministic foundations
    const foundationalCapabilities = [
      { id: "expression.parse", fn: (input: string) => JSON.stringify(parse(input)) },
      { id: "expression.normalize", fn: (input: string) => JSON.stringify(normalize(parse(input))) },
      { id: "expression.evaluate", fn: (input: string, vars: any) => evaluate(parse(input), vars).toString() },
      { id: "expression.simplify", fn: (input: string) => JSON.stringify(simplify(parse(input))) }
    ];

    for (const cap of foundationalCapabilities) {
      this.registry.register({
        capabilityId: cap.id,
        name: cap.id,
        version: 1,
        status: "AVAILABLE",
        dependencies: [],
        implementationRef: "internal",
        requirementId: "internal",
        provenance: { createdBy: "System", timestamp: new Date().toISOString() },
        createdAt: new Date().toISOString(),
        evaluate: cap.fn
      });
    }
  }

  hasCapability(capabilityId: string): boolean {
    const record = this.registry.get(capabilityId);
    return record?.status === "AVAILABLE";
  }

  async execute(request: MathRequest): Promise<MathResult> {
    const startTime = performance.now();
    console.log(`\n[Math Runtime] Request received: ${request.operation}(${request.args.join(", ")})`);

    if (this.hasCapability(request.operation)) {
      const record = this.registry.get(request.operation);
      if (record && record.evaluate) {
        console.log(`[Math Runtime] Fast-path execution for ${request.operation}`);
        const res = record.evaluate(...request.args);
        console.log(`[Math Runtime] Result: ${res}`);
        return { 
           result: res, 
           status: "SUCCESS",
           executionTimeMs: performance.now() - startTime,
           route: "FAST PATH",
           capabilityVersion: record.version,
           agentPlaneInvoked: false
        };
      }
    }

    console.log(`[Math Runtime] UNSUPPORTED CAPABILITY: ${request.operation}`);
    const req: UnsupportedRequirement = {
      requirementId: `req_${Date.now()}`,
      operation: request.operation,
      rawInput: request.args.join(", "),
      requiredCapabilities: [request.operation]
    };

    // The runtime halts here and returns the unsupported requirement object
    // It is up to the orchestrator (or demo component) to route this to the Agent Plane.
    // As per instruction: "The Runtime must NOT invent an answer... It should produce a structured unsupported requirement"
    return { 
       result: req, 
       status: "UNSUPPORTED", 
       message: "Capability not available.",
       executionTimeMs: performance.now() - startTime,
       route: "CAPABILITY DEVELOPMENT PATH",
       agentPlaneInvoked: false
    };
  }
}

