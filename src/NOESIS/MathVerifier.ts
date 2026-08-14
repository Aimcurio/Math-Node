import { OKF } from "./Types";
import { CapabilityRegistry } from "./CapabilityRegistry";
import { ProviderRegistry } from "./ProviderRegistry";
import { parse, simplify, differentiate, format, canonicalKey } from "./MathEngine";
import { createCalculusDifferentiationModule } from "./CalculusDifferentiationModule";
import { registerCapabilityModule } from "./CapabilityModule";

export class MathVerifier {
  constructor(
    private registry: CapabilityRegistry,
    private providers: ProviderRegistry,
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
        
        const testPassed = canonicalKey(simplified) === canonicalKey(simplify(parse(test.expected)));
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
      const [capability] = registerCapabilityModule(
        createCalculusDifferentiationModule(verificationRecord),
        this.registry,
        this.providers
      );
      const verifiedCapability = {
        ...capability,
        requirementId: "req_demo_diff",
        verificationId: verificationRecord.id,
        provenance: {
          ...capability.provenance,
          createdBy: "Agent 006",
          verificationId: verificationRecord.id
        }
      };

      await this.okf.registerCapability(verifiedCapability);
    }

    return verificationRecord;
  }
}
