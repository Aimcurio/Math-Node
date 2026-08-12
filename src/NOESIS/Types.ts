export type CapabilityState = 
  | "DISCOVERED"
  | "VALIDATED"
  | "BUILDING"
  | "INTEGRATED"
  | "VERIFIED"
  | "REGISTERED"
  | "AVAILABLE"
  | "FAILED"
  | "RETIRED";

export type Expr =
  | { type: 'Number'; value: number }
  | { type: 'Variable'; name: string }
  | { type: 'Add'; left: Expr; right: Expr }
  | { type: 'Subtract'; left: Expr; right: Expr }
  | { type: 'Multiply'; left: Expr; right: Expr }
  | { type: 'Divide'; left: Expr; right: Expr }
  | { type: 'Power'; base: Expr; exponent: Expr };

export interface MathRequest {
  operation: string;
  args: any[];
}

export interface MathResult {
  result: any;
  status: "SUCCESS" | "UNSUPPORTED" | "ERROR";
  message?: string;
  executionTimeMs?: number;
  route?: "FAST PATH" | "CAPABILITY DEVELOPMENT PATH";
  capabilityVersion?: number;
  agentPlaneInvoked?: boolean;
}

export interface ProvenanceRecord {
  createdBy: string;
  timestamp: string;
  [key: string]: any;
}

export interface CapabilityRecord {
  capabilityId: string;
  name: string;
  version: number;
  status: CapabilityState;
  dependencies: string[];
  implementationRef: string;
  requirementId: string;
  verificationId?: string;
  provenance: ProvenanceRecord;
  createdAt: string;
  parentRevisionId?: string;
  evaluate?: (...args: any[]) => any;
}

export interface UnsupportedRequirement {
  requirementId: string;
  operation: string;
  rawInput: string;
  requiredCapabilities: string[];
}

export interface CapabilityDevelopmentResult {
  capabilityId: string;
  status: "SUCCESS" | "FAILED";
  record?: CapabilityRecord;
}

export interface OKFQuery {
  id?: string;
  type?: string;
}

export interface OKFRequirementQuery {
  requirementId: string;
}

export interface OKF {
  registerRequirement(requirement: any): Promise<void>;
  retrieveRequirement(id: string): Promise<any>;
  registerCapability(capability: any): Promise<void>;
  retrieveCapability(id: string): Promise<any>;
  registerCapabilityRevision(capability: any): Promise<void>;
  retrieveCapabilityHistory(id: string): Promise<any[]>;
  registerDependency(dep: any): Promise<void>;
  retrieveDependencies(id: string): Promise<string[]>;
  registerRelationship(rel: any): Promise<void>;
  retrieveRelationships(id: string): Promise<any[]>;
  registerVerification(ver: any): Promise<void>;
  retrieveVerification(id: string): Promise<any>;
  registerProvenance(prov: any): Promise<void>;
  retrieveProvenance(id: string): Promise<any>;
  registerFailure(fail: any): Promise<void>;
  retrieveFailures(id: string): Promise<any[]>;
  registerUnlock(unlock: any): Promise<void>;
  retrieveUnlock(id: string): Promise<any>;
  queryCapabilities(query: any): Promise<any[]>;
  queryKnowledge(query: any): Promise<any[]>;
}

export interface KnowledgeRecord {
  id: string;
  type: string;
  data: any;
  provenance: any;
  revisions: any[];
}

export interface VerificationRecord {
  id: string;
  capabilityId: string;
  version: number;
  tests: {
    test: string;
    expected: string;
    actual: string;
    passed: boolean;
  }[];
  passed: boolean;
}
