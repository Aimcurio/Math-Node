import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { CapabilityRegistry } from "../src/NOESIS/CapabilityRegistry";
import { MathRuntime } from "../src/NOESIS/MathRuntime";
import { ProviderRegistry } from "../src/NOESIS/ProviderRegistry";
import { canonicalKey, differentiate, evaluate, parse, simplify } from "../src/NOESIS/MathEngine";
import type { Expr, WolframFixtureRecord } from "../src/NOESIS/Types";
import { fixtureRequestDigest } from "./fixtureDigest";

const fixturePath = new URL("./fixtures/wolfram-fixtures.json", import.meta.url);
const fixtures = JSON.parse(readFileSync(fixturePath, "utf8")) as WolframFixtureRecord[];

function assertExpr(value: unknown): asserts value is Expr {
  assert.ok(value && typeof value === "object");
  const expr = value as Expr;
  switch (expr.type) {
    case "Number":
      assert.equal(typeof expr.value, "number");
      return;
    case "Variable":
      assert.equal(typeof expr.name, "string");
      return;
    case "Negate":
      assertExpr(expr.value);
      return;
    case "Add":
    case "Subtract":
    case "Multiply":
    case "Divide":
      assertExpr(expr.left);
      assertExpr(expr.right);
      return;
    case "Power":
      assertExpr(expr.base);
      assertExpr(expr.exponent);
      return;
    default:
      assert.fail(`Unsupported Expr node: ${(expr as { type?: string }).type}`);
  }
}

function validateShape(fixture: WolframFixtureRecord): void {
  assert.equal(fixture.schemaVersion, 1);
  assert.match(fixture.requestDigest, /^[a-f0-9]{64}$/);
  assert.equal(fixture.requestDigest, fixtureRequestDigest(fixture));
  assert.equal(fixture.provider, "wolfram");
  assert.match(fixture.generatedAt, /^\d{4}-\d{2}-\d{2}T/);

  if (fixture.status === "UNSUPPORTED_RESULT") {
    assert.equal(fixture.expectedExpr, undefined);
    assert.equal(fixture.expectedNumeric, undefined);
    assert.match(fixture.providerResultText ?? "", /\S/);
    return;
  }

  if (fixture.status === "PROVIDER_ERROR") {
    assert.equal(fixture.expectedExpr, undefined);
    assert.equal(fixture.expectedNumeric, undefined);
    assert.match(fixture.providerResultText ?? "", /\S/);
    return;
  }

  if (fixture.operation === "numericEvaluate") {
    assert.equal(typeof fixture.expectedNumeric, "number");
    assert.equal(fixture.expectedExpr, undefined);
    return;
  }

  assertExpr(fixture.expectedExpr);
  assert.equal(fixture.expectedNumeric, undefined);
}

function actualExprFor(fixture: WolframFixtureRecord): Expr {
  const ast = parse(fixture.input.expression);
  if (fixture.operation === "differentiate") {
    return simplify(differentiate(ast, fixture.input.variable ?? "x"));
  }
  if (fixture.operation === "simplify") {
    return simplify(ast);
  }
  assert.fail(`No symbolic verifier for operation: ${fixture.operation}`);
}

function actualNumericFor(fixture: WolframFixtureRecord): number {
  assert.equal(fixture.operation, "numericEvaluate");
  return evaluate(parse(fixture.input.expression), fixture.input.vars ?? {});
}

assert.ok(fixtures.length > 0);

for (const fixture of fixtures) {
  validateShape(fixture);
  assert.doesNotThrow(() => parse(fixture.input.expression));

  if (fixture.status === "UNSUPPORTED_RESULT") {
    assert.throws(() => parse(fixture.providerResultText ?? ""));
    continue;
  }

  if (fixture.status === "PROVIDER_ERROR") continue;

  if (fixture.operation === "numericEvaluate") {
    assert.equal(actualNumericFor(fixture), fixture.expectedNumeric);
    continue;
  }

  assert.ok(fixture.expectedExpr);
  assert.equal(canonicalKey(actualExprFor(fixture)), canonicalKey(fixture.expectedExpr));
}

const providerErrorFixture: WolframFixtureRecord = {
  schemaVersion: 1,
  operation: "simplify",
  input: { expression: "x" },
  status: "PROVIDER_ERROR",
  providerResultText: "upstream timeout",
  provider: "wolfram",
  requestDigest: "",
  generatedAt: "2026-08-13T00:00:00.000Z"
};
providerErrorFixture.requestDigest = fixtureRequestDigest(providerErrorFixture);
validateShape(providerErrorFixture);
assert.doesNotThrow(() => parse(providerErrorFixture.input.expression));

const providers = new ProviderRegistry();
const registry = new CapabilityRegistry(providers);
const runtime = new MathRuntime(registry, providers);
const unsupported = await runtime.execute({ operation: "limit", args: ["x"] });

assert.equal(unsupported.status, "UNSUPPORTED");
assert.equal(unsupported.agentPlaneInvoked, false);

console.log("wolfram fixture validation passed");
