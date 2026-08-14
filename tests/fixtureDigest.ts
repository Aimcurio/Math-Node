import { createHash } from "node:crypto";
import type { WolframFixtureRecord } from "../src/NOESIS/Types";

type DigestInput = Pick<WolframFixtureRecord, "schemaVersion" | "operation" | "input" | "provider">;

export function fixtureRequestDigest(fixture: DigestInput): string {
  return createHash("sha256")
    .update(stableStringify({
      schemaVersion: fixture.schemaVersion,
      operation: fixture.operation,
      input: fixture.input,
      provider: fixture.provider
    }))
    .digest("hex");
}

function stableStringify(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }
  if (value && typeof value === "object") {
    return `{${Object.keys(value as Record<string, unknown>)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableStringify((value as Record<string, unknown>)[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}
