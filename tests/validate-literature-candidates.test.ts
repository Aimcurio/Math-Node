import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parse } from "../src/NOESIS/MathEngine";

type LiteratureCandidate = {
  schemaVersion: 1;
  source: string;
  sourcePlugin: "none" | "scispace" | "sider_scholar";
  expression: string;
  operationCandidates: ("differentiate" | "simplify" | "numericEvaluate")[];
  status: "CANDIDATE" | "REJECTED" | "PROMOTED";
  notes?: string;
};

const candidatePath = new URL("./fixtures/literature-candidates.json", import.meta.url);
const candidates = JSON.parse(readFileSync(candidatePath, "utf8")) as LiteratureCandidate[];

assert.ok(candidates.length > 0);

for (const candidate of candidates) {
  assert.equal(candidate.schemaVersion, 1);
  assert.match(candidate.source, /\S/);
  assert.ok(["none", "scispace", "sider_scholar"].includes(candidate.sourcePlugin));
  assert.match(candidate.expression, /\S/);
  assert.ok(candidate.operationCandidates.length > 0);
  assert.ok(["CANDIDATE", "REJECTED", "PROMOTED"].includes(candidate.status));

  if (candidate.status === "PROMOTED") {
    assert.fail("Promoted literature candidates must be removed from candidate staging and represented in wolfram-fixtures.json.");
  }

  if (candidate.status === "CANDIDATE") {
    assert.doesNotThrow(() => parse(candidate.expression));
  }
}

console.log("literature candidate validation passed");
