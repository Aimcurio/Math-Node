import { CapabilityRecord } from "./Types";
import { CapabilityImplementation, ProviderRegistry } from "./ProviderRegistry";
import { CapabilityRegistry } from "./CapabilityRegistry";

export type CapabilityImplementationFactory = (providers: ProviderRegistry) => CapabilityImplementation;

export interface CapabilityModuleEntry {
  capabilityId: string;
  implementationRef: string;
  dependencies: string[];
  implementation?: CapabilityImplementation;
  createImplementation?: CapabilityImplementationFactory;
  version?: number;
  provenanceCreatedBy?: string;
  verificationId?: string;
}

export interface CapabilityModule {
  moduleId: string;
  entries: CapabilityModuleEntry[];
  verificationId?: string;
}

export function registerCapabilityModule(
  module: CapabilityModule,
  registry: CapabilityRegistry,
  providers: ProviderRegistry
): CapabilityRecord[] {
  validateCapabilityModule(module, registry, providers);
  const records = createCapabilityRecords(module);

  providers.registerBatch(module.entries.map((entry) => ({
    implementationRef: entry.implementationRef,
    implementation: createImplementation(entry, providers)
  })));

  for (const record of records) {
    registry.register(record);
  }

  return records;
}

function validateCapabilityModule(
  module: CapabilityModule,
  registry: CapabilityRegistry,
  providers: ProviderRegistry
): void {
  if (!module.moduleId) throw new Error("moduleId is required");
  if (module.entries.length === 0) throw new Error(`Capability module has no entries: ${module.moduleId}`);

  const moduleCapabilities = new Set<string>();
  const moduleImplementations = new Set<string>();

  for (const entry of module.entries) {
    if (!entry.capabilityId) throw new Error("capabilityId is required");
    if (!entry.implementationRef) throw new Error("implementationRef is required");
    if (!entry.implementation && !entry.createImplementation) {
      throw new Error(`Capability implementation is required: ${entry.capabilityId}`);
    }
    if (moduleCapabilities.has(entry.capabilityId) || registry.has(entry.capabilityId)) {
      throw new Error(`Capability already registered or duplicated: ${entry.capabilityId}`);
    }
    if (moduleImplementations.has(entry.implementationRef) || providers.resolve(entry.implementationRef)) {
      throw new Error(`Implementation already registered or duplicated: ${entry.implementationRef}`);
    }
    moduleCapabilities.add(entry.capabilityId);
    moduleImplementations.add(entry.implementationRef);
  }

  const available = new Set(registry.listAvailable().map((record) => record.capabilityId));

  for (const entry of module.entries) {
    for (const dependency of entry.dependencies) {
      if (!available.has(dependency) && !moduleCapabilities.has(dependency)) {
        throw new Error(`Unavailable dependency: ${dependency}`);
      }
    }
    available.add(entry.capabilityId);
  }
}

function createCapabilityRecords(module: CapabilityModule): CapabilityRecord[] {
  return module.entries.map((entry) => {
    const timestamp = new Date().toISOString();

    return {
      capabilityId: entry.capabilityId,
      name: entry.capabilityId,
      version: entry.version ?? 1,
      status: "AVAILABLE",
      dependencies: entry.dependencies,
      implementationRef: entry.implementationRef,
      requirementId: "internal",
      verificationId: entry.verificationId ?? module.verificationId,
      provenance: {
        createdBy: entry.provenanceCreatedBy ?? module.moduleId,
        timestamp: new Date().toISOString(),
        moduleId: module.moduleId,
        verificationId: entry.verificationId ?? module.verificationId
      },
      createdAt: timestamp
    };
  });
}

function createImplementation(entry: CapabilityModuleEntry, providers: ProviderRegistry): CapabilityImplementation {
  if (entry.createImplementation) return entry.createImplementation(providers);
  if (entry.implementation) return entry.implementation;
  throw new Error(`Capability implementation is required: ${entry.capabilityId}`);
}
