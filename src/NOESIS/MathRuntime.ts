import { MathRequest, MathResult, UnsupportedRequirement } from "./Types";
import { CapabilityRegistry } from "./CapabilityRegistry";
import { ProviderRegistry } from "./ProviderRegistry";
import { CapabilityModule, registerCapabilityModule } from "./CapabilityModule";
import { createFoundationModule } from "./FoundationModule";

export class MathRuntime {
  constructor(
    private registry: CapabilityRegistry,
    private providers: ProviderRegistry,
    modules: CapabilityModule[] = [createFoundationModule()]
  ) {
    for (const module of modules) {
      registerCapabilityModule(module, this.registry, this.providers);
    }
  }

  hasCapability(capabilityId: string): boolean {
    const record = this.registry.get(capabilityId);
    return record?.status === "AVAILABLE";
  }

  async execute(request: MathRequest): Promise<MathResult> {
    const startTime = performance.now();
    const serializedArgs = serializeArgs(request.args);
    console.log(`\n[Math Runtime] Request received: ${request.operation}(${serializedArgs})`);

    if (this.hasCapability(request.operation)) {
      const record = this.registry.get(request.operation);
      if (record) {
        const implementation = this.providers.resolve(record.implementationRef);
        if (!implementation) {
          return {
            result: null,
            status: "ERROR",
            message: `Implementation unavailable: ${record.implementationRef}`,
            executionTimeMs: performance.now() - startTime,
            route: "FAST PATH",
            capabilityVersion: record.version,
            agentPlaneInvoked: false
          };
        }
        try {
          console.log(`[Math Runtime] Fast-path execution for ${request.operation}`);
          const res = implementation(...request.args);
          console.log(`[Math Runtime] Result: ${res}`);
          return {
             result: res,
             status: "SUCCESS",
             executionTimeMs: performance.now() - startTime,
             route: "FAST PATH",
             capabilityVersion: record.version,
             agentPlaneInvoked: false
          };
        } catch (err: any) {
          return {
            result: null,
            status: "ERROR",
            message: err?.message ?? "Capability implementation failed.",
            executionTimeMs: performance.now() - startTime,
            route: "FAST PATH",
            capabilityVersion: record.version,
            agentPlaneInvoked: false
          };
        }
      }
    }

    console.log(`[Math Runtime] UNSUPPORTED CAPABILITY: ${request.operation}`);
    const req: UnsupportedRequirement = {
      requirementId: `req_${Date.now()}`,
      operation: request.operation,
      rawInput: serializedArgs,
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

function serializeArgs(args: any[]): string {
  return JSON.stringify(args, (_key, value) => {
    if (typeof value === "function") return "[Function]";
    if (typeof value === "bigint") return value.toString();
    return value;
  });
}
