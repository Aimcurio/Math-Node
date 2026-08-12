import { KnowledgeRecord, OKFQuery, VerificationRecord, OKF as IOKF } from "./Types";

export class OKF implements IOKF {
  private store: Map<string, KnowledgeRecord> = new Map();
  private verificationStore: Map<string, VerificationRecord> = new Map();
  private requirements: Map<string, any> = new Map();
  private dependencies: Map<string, any> = new Map();
  private relationships: Map<string, any> = new Map();
  private provenances: Map<string, any> = new Map();
  private failures: Map<string, any> = new Map();
  private unlocks: Map<string, any> = new Map();

  async registerRequirement(req: any) { this.requirements.set(req.id, req); }
  async retrieveRequirement(id: string) { return this.requirements.get(id); }
  
  async registerCapability(cap: any) { await this.register(cap); }
  async retrieveCapability(id: string) { return await this.getCapability(id); }
  
  async registerCapabilityRevision(cap: any) { await this.register(cap); }
  async retrieveCapabilityHistory(id: string) { return await this.getHistory(id); }
  
  async registerDependency(dep: any) { this.dependencies.set(dep.id, dep); }
  async retrieveDependencies(id: string) { return await this.getDependencies(id); }
  
  async registerRelationship(rel: any) { this.relationships.set(rel.id, rel); }
  async retrieveRelationships(id: string) { return this.relationships.get(id); }
  
  async registerProvenance(prov: any) { this.provenances.set(prov.id, prov); }
  async retrieveProvenance(id: string) { return this.provenances.get(id); }
  
  async registerFailure(fail: any) { this.failures.set(fail.id, fail); }
  async retrieveFailures(id: string) { return Array.from(this.failures.values()).filter(f => f.capabilityId === id); }
  
  async registerUnlock(unlock: any) { this.unlocks.set(unlock.id, unlock); }
  async retrieveUnlock(id: string) { return this.unlocks.get(id); }
  
  async queryCapabilities(query: any) { return []; }
  async queryKnowledge(query: any) { return []; }

  async retrieve(query: OKFQuery): Promise<KnowledgeRecord[]> {
    return Array.from(this.store.values()).filter(r => {
      if (query.id && r.id !== query.id) return false;
      if (query.type && r.type !== query.type) return false;
      return true;
    });
  }

  async register(record: KnowledgeRecord): Promise<void> {
    this.store.set(record.id, record);
  }

  async getCapability(id: string): Promise<KnowledgeRecord | null> {
    return this.store.get(id) || null;
  }

  async getHistory(id: string): Promise<KnowledgeRecord[]> {
    const record = this.store.get(id);
    if (!record) return [];
    return record.revisions || [];
  }

  async getDependencies(id: string): Promise<string[]> {
    const record = this.store.get(id);
    if (!record || !record.data || !record.data.dependencies) return [];
    return record.data.dependencies;
  }

  async registerVerification(record: VerificationRecord): Promise<void> {
     this.verificationStore.set(record.id, record);
  }

  async retrieveVerification(capabilityId: string): Promise<VerificationRecord | null> {
    const verifications = Array.from(this.verificationStore.values());
    const match = verifications.find(v => v.capabilityId === capabilityId);
    return match || null;
  }
}
