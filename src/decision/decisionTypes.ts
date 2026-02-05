export type DecisionType =
  | "NO_ACTION"
  | "MONITOR"
  | "PREPARE_FORUM_POST"
  | "PREPARE_COLLAB_OUTREACH"
  | "PREPARE_POLL_RESPONSE";

export interface AgentDecision {
  type: DecisionType;
  confidence: number; // 0 → 1
  reason: string;
  context?: Record<string, unknown>;
}
