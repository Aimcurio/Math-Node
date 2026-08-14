import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import type { WolframFixtureRecord } from "../src/NOESIS/Types";

type LiteratureCandidate = {
  schemaVersion: 1;
  source: string;
  sourcePlugin: "none" | "scispace" | "sider_scholar";
  expression: string;
  operationCandidates: ("differentiate" | "simplify" | "numericEvaluate")[];
  status: "CANDIDATE" | "REJECTED" | "PROMOTED";
};

const wolframFixtures = JSON.parse(
  readFileSync(new URL("./fixtures/wolfram-fixtures.json", import.meta.url), "utf8")
) as WolframFixtureRecord[];

const literatureCandidates = JSON.parse(
  readFileSync(new URL("./fixtures/literature-candidates.json", import.meta.url), "utf8")
) as LiteratureCandidate[];

const promotedKeys = new Set<string>();
const fixtureDigests = new Set<string>();

for (const fixture of wolframFixtures) {
  assert.equal(fixtureDigests.has(fixture.requestDigest), false);
  fixtureDigests.add(fixture.requestDigest);
  promotedKeys.add(`${fixture.operation}:${fixture.input.expression}`);
}

for (const candidate of literatureCandidates) {
  for (const operation of candidate.operationCandidates) {
    if (promotedKeys.has(`${operation}:${candidate.expression}`)) {
      assert.fail(`Candidate already appears promoted as a Wolfram fixture: ${candidate.expression}`);
    }
  }
}

console.log("fixture boundary validation passed");
