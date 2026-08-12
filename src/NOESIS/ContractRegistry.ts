export type ContractStatus = "DRAFT" | "VERIFIED" | "DEPRECATED" | "RETIRED";

export interface ContractDefinition {
  id: string;
  version: number;
  status: ContractStatus;
  producer: string;
  consumer: string;
  inputSchemaRef: string;
  outputSchemaRef: string;
  preconditions: string[];
  postconditions: string[];
  invariants: string[];
  failureModes: string[];
  verificationPolicy: string[];
  humanOversightRequired?: boolean;
  provenanceRequired: boolean;
  signatureRequired?: boolean;
}

export class ContractRegistry {
  private contracts = new Map<string, ContractDefinition>();

  private key(id: string, version: number) {
    return `${id}@${version}`;
  }

  register(contract: ContractDefinition): void {
    if (contract.status === "VERIFIED" && contract.verificationPolicy.length === 0) {
      throw new Error(`Verified contract ${contract.id} requires a verification policy.`);
    }
    this.contracts.set(this.key(contract.id, contract.version), Object.freeze({ ...contract }));
  }

  get(id: string, version: number): ContractDefinition | undefined {
    return this.contracts.get(this.key(id, version));
  }

  requireVerified(id: string, version: number): ContractDefinition {
    const contract = this.get(id, version);
    if (!contract || contract.status !== "VERIFIED") {
      throw new Error(`Contract ${id}@${version} is not verified.`);
    }
    return contract;
  }

  list(): ContractDefinition[] {
    return [...this.contracts.values()];
  }
}
