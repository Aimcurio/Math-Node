import { CapabilityModule } from "./CapabilityModule";
import { differentiate } from "./MathEngine";
import { VerificationRecord } from "./Types";

export function createCalculusDifferentiationModule(verification: VerificationRecord): CapabilityModule {
  if (
    !verification.passed ||
    verification.capabilityId !== "calculus.differentiation" ||
    verification.version !== 1
  ) {
    throw new Error("A passed version 1 calculus.differentiation verification is required");
  }

  return {
    moduleId: "calculus.differentiation:v1",
    verificationId: verification.id,
    entries: [
      {
        capabilityId: "calculus.differentiation",
        implementationRef: "local:calculus.differentiate:v1",
        dependencies: ["expression.parse", "expression.simplifyAst", "expression.format"],
        provenanceCreatedBy: "MathVerifier",
        verificationId: verification.id,
        createImplementation: (providers) => {
          const parseImpl = providers.resolve("local:expression.parse:v1");
          const simplifyAstImpl = providers.resolve("local:expression.simplifyAst:v1");
          const formatImpl = providers.resolve("local:expression.format:v1");

          if (!parseImpl || !simplifyAstImpl || !formatImpl) {
            throw new Error("Required expression providers are unavailable");
          }

          return (exprStr: string, variable: string = "x") => {
          const ast = JSON.parse(parseImpl(exprStr));
          const diff = differentiate(ast, variable);
          const simp = simplifyAstImpl(diff);
          return formatImpl(simp);
          };
        }
      }
    ]
  };
}
