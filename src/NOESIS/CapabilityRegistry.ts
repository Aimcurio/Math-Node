import { CapabilityRecord } from "./Types";

export class CapabilityRegistry {
  private records: Map<string, CapabilityRecord> = new Map();

  get(id: string): CapabilityRecord | null {
    return this.records.get(id) || null;
  }

  listAvailable(): CapabilityRecord[] {
    return Array.from(this.records.values()).filter(r => r.status === "AVAILABLE");
  }

  register(record: CapabilityRecord): void {
    if (record.status !== "AVAILABLE") {
        throw new Error("Cannot register a capability to Runtime Registry unless status is AVAILABLE");
    }
    this.records.set(record.capabilityId, record);
  }
}
