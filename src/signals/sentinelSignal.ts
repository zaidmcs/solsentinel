export type SentinelMode = "ACT" | "READ_ONLY";
export type SentinelRisk = "RISK_ON" | "RISK_OFF" | "NEUTRAL";
export type SentinelExecution = "SAFE_TO_EXECUTE" | "WAIT";

export interface SentinelSignal {
  version: "1.0";
  timestamp: string;

  mode: SentinelMode;
  risk: SentinelRisk;
  execution: SentinelExecution;

  confidence: number; // 0 → 1

  reasons: string[];
}
