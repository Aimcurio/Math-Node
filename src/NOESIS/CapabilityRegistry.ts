import { CapabilityRecord } from "./Types";
import { ProviderRegistry } from "./ProviderRegistry";

export class CapabilityRegistry {
  private records: Map<string, CapabilityRecord> = new Map();

  constructor(private providers: ProviderRegistry) {}

  get(id: string): CapabilityRecord | null {
    return this.records.get(id) || null;
  }

  listAvailable(): CapabilityRecord[] {
    return Array.from(this.records.values()).filter(r => r.status === "AVAILABLE");
  }

  hasAvailable(id: string): boolean {
    return this.records.get(id)?.status === "AVAILABLE";
  }

  has(id: string): boolean {
    return this.records.has(id);
  }

  register(record: CapabilityRecord): void {
    if (record.status !== "AVAILABLE") {
      throw new Error("Cannot register a capability to Runtime Registry unless status is AVAILABLE");
    }
    if (this.records.has(record.capabilityId)) {
      throw new Error(`Capability already registered: ${record.capabilityId}`);
    }
    if (!this.providers.resolve(record.implementationRef)) {
      throw new Error(`No local implementation registered for: ${record.implementationRef}`);
    }
    for (const dependency of record.dependencies) {
      if (!this.hasAvailable(dependency)) {
        throw new Error(`Unavailable dependency: ${dependency}`);
      }
    }
    this.records.set(record.capabilityId, record);
  }

}
