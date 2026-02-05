export type SentinelMode = "READ_ONLY" | "ACT";
export type RiskLevel = "RISK_OFF" | "NEUTRAL" | "RISK_ON";
export type ExecutionState = "WAIT" | "SAFE_TO_EXECUTE";

export interface SentinelSignal {
  mode: SentinelMode;
  risk: RiskLevel;
  execution: ExecutionState;
  confidence: number; // 0 → 1
  reasons: string[];
}
