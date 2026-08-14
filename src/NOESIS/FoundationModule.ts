import { evaluate, format, normalize, parse, simplify } from "./MathEngine";
import { CapabilityModule } from "./CapabilityModule";

export function createFoundationModule(): CapabilityModule {
  return {
    moduleId: "foundation.expression:v1",
    entries: [
      {
        capabilityId: "expression.parse",
        implementationRef: "local:expression.parse:v1",
        dependencies: [],
        implementation: (input: string) => JSON.stringify(parse(input))
      },
      {
        capabilityId: "expression.normalize",
        implementationRef: "local:expression.normalize:v1",
        dependencies: ["expression.parse"],
        implementation: (input: string) => JSON.stringify(normalize(parse(input)))
      },
      {
        capabilityId: "expression.evaluate",
        implementationRef: "local:expression.evaluate:v1",
        dependencies: ["expression.parse"],
        implementation: (input: string, vars: any) => evaluate(parse(input), vars).toString()
      },
      {
        capabilityId: "expression.simplify",
        implementationRef: "local:expression.simplify:v1",
        dependencies: ["expression.parse"],
        implementation: (input: string) => JSON.stringify(simplify(parse(input)))
      },
      {
        capabilityId: "expression.simplifyAst",
        implementationRef: "local:expression.simplifyAst:v1",
        dependencies: [],
        implementation: simplify
      },
      {
        capabilityId: "expression.format",
        implementationRef: "local:expression.format:v1",
        dependencies: [],
        implementation: format
      }
    ]
  };
}
