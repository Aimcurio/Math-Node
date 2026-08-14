import assert from "node:assert/strict";
import { CapabilityRegistry } from "../src/NOESIS/CapabilityRegistry";
import { MathRuntime } from "../src/NOESIS/MathRuntime";
import { ProviderRegistry } from "../src/NOESIS/ProviderRegistry";
import { canonicalKey, evaluate, format, parse, simplify } from "../src/NOESIS/MathEngine";
import type { WolframFixtureRecord } from "../src/NOESIS/Types";
import type { CapabilityModule } from "../src/NOESIS/CapabilityModule";
import { createCalculusDifferentiationModule } from "../src/NOESIS/CalculusDifferentiationModule";
import { registerCapabilityModule } from "../src/NOESIS/CapabilityModule";

function assertNoFunctionValues(value: unknown): void {
  assert.notEqual(typeof value, "function");
  if (value && typeof value === "object") {
    for (const child of Object.values(value as Record<string, unknown>)) {
      assertNoFunctionValues(child);
    }
  }
}

const providers = new ProviderRegistry();
const registry = new CapabilityRegistry(providers);
const runtime = new MathRuntime(registry, providers);

assert.equal(runtime.hasCapability("expression.parse"), true);

const parseRecord = registry.get("expression.parse");
assert.ok(parseRecord);
assertNoFunctionValues(parseRecord);
assert.equal(JSON.stringify(parseRecord).includes("implementationRef"), true);

assert.equal(canonicalKey(parse("x + 2")), canonicalKey(parse("2 + x")));
assert.equal(canonicalKey(parse("x + (y + z)")), canonicalKey(parse("(x + y) + z")));
assert.deepEqual(simplify(parse("x - x")), { type: "Number", value: 0 });
assert.equal(format(parse("-x")), "-x");
assert.equal(evaluate(parse("-x"), { x: 4 }), -4);
assert.equal(canonicalKey(parse("2x")), canonicalKey(parse("2*x")));
assert.equal(canonicalKey(parse("(x+1)(x-1)")), canonicalKey(parse("(x+1)*(x-1)")));
assert.equal(canonicalKey(parse("-x^2")), canonicalKey({ type: "Negate", value: { type: "Power", base: { type: "Variable", name: "x" }, exponent: { type: "Number", value: 2 } } }));

const unsupportedResultFixtureStatus: WolframFixtureRecord["status"] = "UNSUPPORTED_RESULT";
assert.equal(unsupportedResultFixtureStatus, "UNSUPPORTED_RESULT");

const unsupported = await runtime.execute({ operation: "integrate", args: ["x^2"] });
assert.equal(unsupported.status, "UNSUPPORTED");
assert.equal(unsupported.agentPlaneInvoked, false);

const malformed = await runtime.execute({ operation: "expression.parse", args: ["sin(x)"] });
assert.equal(malformed.status, "ERROR");
assert.equal(malformed.agentPlaneInvoked, false);

const customProviders = new ProviderRegistry();
const customRegistry = new CapabilityRegistry(customProviders);
const customModule: CapabilityModule = {
  moduleId: "test.arithmetic:v1",
  entries: [
    {
      capabilityId: "arithmetic.double",
      implementationRef: "local:arithmetic.double:v1",
      dependencies: [],
      implementation: (value: number) => value * 2
    }
  ]
};
const customRuntime = new MathRuntime(customRegistry, customProviders, [customModule]);
const doubled = await customRuntime.execute({ operation: "arithmetic.double", args: [21] });
assert.equal(doubled.status, "SUCCESS");
assert.equal(doubled.result, 42);
assert.equal(customRuntime.hasCapability("expression.parse"), false);

const atomicProviders = new ProviderRegistry();
const atomicRegistry = new CapabilityRegistry(atomicProviders);
assert.throws(
  () => new MathRuntime(atomicRegistry, atomicProviders, [{
    moduleId: "test.invalid:v1",
    entries: [
      {
        capabilityId: "valid.first",
        implementationRef: "local:valid.first:v1",
        dependencies: [],
        implementation: () => "ok"
      },
      {
        capabilityId: "invalid.second",
        implementationRef: "local:invalid.second:v1",
        dependencies: ["missing.dependency"],
        implementation: () => "bad"
      }
    ]
  }])
);
assert.equal(atomicProviders.resolve("local:valid.first:v1"), null);
assert.equal(atomicRegistry.get("valid.first"), null);

const objectUnsupported = await runtime.execute({
  operation: "matrix.det",
  args: [{ rows: [[1, 2], [3, 4]] }]
});
assert.equal(objectUnsupported.status, "UNSUPPORTED");
assert.equal((objectUnsupported.result as { rawInput: string }).rawInput, '[{"rows":[[1,2],[3,4]]}]');

const calculusVerification = {
  id: "ver_test_calculus",
  capabilityId: "calculus.differentiation",
  version: 1,
  tests: [],
  passed: true
};
const calculusProviders = new ProviderRegistry();
const calculusRegistry = new CapabilityRegistry(calculusProviders);
const calculusRuntime = new MathRuntime(calculusRegistry, calculusProviders);
registerCapabilityModule(createCalculusDifferentiationModule(calculusVerification), calculusRegistry, calculusProviders);
const differentiated = await calculusRuntime.execute({
  operation: "calculus.differentiation",
  args: ["x^2 + 3*x + 1"]
});
assert.equal(differentiated.status, "SUCCESS");
assert.equal(canonicalKey(parse(String(differentiated.result))), canonicalKey(parse("2*x + 3")));
const differentiationRecord = calculusRegistry.get("calculus.differentiation");
assert.ok(differentiationRecord);
assertNoFunctionValues(differentiationRecord);
assert.equal(differentiationRecord.provenance.moduleId, "calculus.differentiation:v1");
assert.equal(differentiationRecord.verificationId, calculusVerification.id);

assert.throws(() => createCalculusDifferentiationModule({
  id: "ver_failed_calculus",
  capabilityId: "calculus.differentiation",
  version: 1,
  tests: [],
  passed: false
}));

assert.throws(() => createCalculusDifferentiationModule({
  id: "ver_wrong_version_calculus",
  capabilityId: "calculus.differentiation",
  version: 2,
  tests: [],
  passed: true
}));

console.log("math-core contract tests passed");
