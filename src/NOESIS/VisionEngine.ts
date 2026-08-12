export type VisualKind =
  | "DERIVATION_TREE"
  | "DEPENDENCY_GRAPH"
  | "KNOWLEDGE_GRAPH"
  | "AGENT_CONTRACT_GRAPH"
  | "SEQUENCE_FLOW"
  | "TIMELINE"
  | "MIND_MAP"
  | "VERIFICATION_DASHBOARD"
  | "STATISTICAL_CHART";

export interface VisualEvidence {
  sourceId: string;
  verified: boolean;
  provenanceRef?: string;
  confidence?: number;
  importance?: number;
}

export interface VisualRequest {
  purpose: string;
  semanticType: string;
  data: unknown;
  evidence: VisualEvidence[];
  humanOversight?: boolean;
}

export interface VisualPlan {
  kind: VisualKind;
  rationale: string;
  naturalLanguageSummary?: string;
  evidence: VisualEvidence[];
  warnings: string[];
}

export class VisionEngine {
  plan(request: VisualRequest): VisualPlan {
    const warnings: string[] = [];
    if (request.evidence.some(e => !e.verified)) {
      warnings.push("Visual contains unverified evidence and must display that status explicitly.");
    }

    const type = request.semanticType.toLowerCase();
    let kind: VisualKind = "DEPENDENCY_GRAPH";
    if (type.includes("derivation") || type.includes("proof")) kind = "DERIVATION_TREE";
    else if (type.includes("knowledge")) kind = "KNOWLEDGE_GRAPH";
    else if (type.includes("agent") || type.includes("contract")) kind = "AGENT_CONTRACT_GRAPH";
    else if (type.includes("sequence") || type.includes("workflow")) kind = "SEQUENCE_FLOW";
    else if (type.includes("time") || type.includes("history")) kind = "TIMELINE";
    else if (type.includes("concept") || type.includes("brainstorm")) kind = "MIND_MAP";
    else if (type.includes("verification") || type.includes("audit")) kind = "VERIFICATION_DASHBOARD";
    else if (type.includes("stat") || type.includes("series")) kind = "STATISTICAL_CHART";

    return {
      kind,
      rationale: `Selected ${kind} from semantic type '${request.semanticType}' and purpose '${request.purpose}'.`,
      naturalLanguageSummary: request.humanOversight
        ? "Human oversight view: inspect evidence, verification status, uncertainty, alternatives, and consequences before approval."
        : undefined,
      evidence: [...request.evidence].sort((a, b) => (b.importance ?? 0) - (a.importance ?? 0)),
      warnings
    };
  }
}
