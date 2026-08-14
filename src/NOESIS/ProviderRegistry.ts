export type CapabilityImplementation = (...args: any[]) => any;

/**
 * Local-only implementation registry. Capability records contain only the
 * serializable reference, never executable code.
 */
export class ProviderRegistry {
  private implementations = new Map<string, CapabilityImplementation>();

  register(implementationRef: string, implementation: CapabilityImplementation): void {
    if (!implementationRef) throw new Error("implementationRef is required");
    if (this.implementations.has(implementationRef)) {
      throw new Error(`Implementation already registered: ${implementationRef}`);
    }
    this.implementations.set(implementationRef, implementation);
  }

  registerBatch(entries: { implementationRef: string; implementation: CapabilityImplementation }[]): void {
    const seen = new Set<string>();

    for (const entry of entries) {
      if (!entry.implementationRef) throw new Error("implementationRef is required");
      if (seen.has(entry.implementationRef)) {
        throw new Error(`Duplicate implementation in batch: ${entry.implementationRef}`);
      }
      if (this.implementations.has(entry.implementationRef)) {
        throw new Error(`Implementation already registered: ${entry.implementationRef}`);
      }
      seen.add(entry.implementationRef);
    }

    for (const entry of entries) {
      this.implementations.set(entry.implementationRef, entry.implementation);
    }
  }

  resolve(implementationRef: string): CapabilityImplementation | null {
    return this.implementations.get(implementationRef) ?? null;
  }
}
