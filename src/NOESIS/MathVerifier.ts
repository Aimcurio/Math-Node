import { OKF } from "./Types";
import { CapabilityRegistry } from "./CapabilityRegistry";
import { parse, simplify, differentiate, format } from "./MathEngine";

export class MathVerifier {
  constructor(
    private registry: CapabilityRegistry,
    private okf: OKF
  ) {}

  async verifyAndRegisterDifferentiation() {
    const tests = [
      { input: "x", expected: "1" },
      { input: "5", expected: "0" },
      { input: "x^2", expected: "2*x" },
      { input: "x^3", expected: "3*x^2" },
      { input: "7*x", expected: "7" },
      { input: "x^2 + 3*x + 1", expected: "2*x + 3" },
      { input: "4*x^3 - 7*x^2 + 2", expected: "12*x^2 - 14*x" }
    ];

    const results = [];
    let passed = true;

    for (const test of tests) {
      try {
        const ast = parse(test.input);
        const diff = differentiate(ast, 'x');
        const simplified = simplify(diff);
        const actual = format(simplified);
        
        // Very basic string comparison for equality, normally we'd do AST equivalence
        const cleanActual = actual.replace(/\s+/g, '');
        const cleanExpected = test.expected.replace(/\s+/g, '');
        
        const testPassed = cleanActual === cleanExpected;
        if (!testPassed) passed = false;

        results.push({
          test: `d/dx(${test.input}) = ${test.expected}`,
          expected: test.expected,
          actual,
          passed: testPassed
        });
      } catch (err: any) {
        passed = false;
        results.push({
          test: `d/dx(${test.input}) = ${test.expected}`,
          expected: test.expected,
          actual: err.message,
          passed: false
        });
      }
    }

    const verificationRecord = {
      id: `ver_${Date.now()}`,
      capabilityId: "calculus.differentiation",
      version: 1,
      tests: results,
      passed
    };

    await this.okf.registerVerification(verificationRecord);

    if (passed) {
      const capability = {
        capabilityId: "calculus.differentiation",
        name: "calculus.differentiation",
        version: 1,
        status: "AVAILABLE" as any,
        dependencies: ["expression.parse", "expression.simplify"],
        implementationRef: "MathEngine.differentiate",
        requirementId: "req_demo_diff",
        verificationId: verificationRecord.id,
        provenance: { createdBy: "Agent 006", timestamp: new Date().toISOString() },
        createdAt: new Date().toISOString(),
        evaluate: (exprStr: string) => {
          const ast = parse(exprStr);
          const diff = differentiate(ast, 'x');
          const simp = simplify(diff);
          return format(simp);
        }
      };

      await this.okf.registerCapability(capability);
      this.registry.register(capability);
    }

    return verificationRecord;
  }
}
