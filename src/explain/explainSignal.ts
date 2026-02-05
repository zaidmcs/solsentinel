import { SentinelSignal } from "../signals/signalTypes";

export function explainSignal(signal: SentinelSignal): string {
  return `
SolSentinel Decision Summary
----------------------------
Mode: ${signal.mode}
Risk Level: ${signal.risk}
Execution State: ${signal.execution}
Confidence: ${(signal.confidence * 100).toFixed(1)}%

Reasons:
${signal.reasons.map((r) => `- ${r}`).join("\n")}
`.trim();
}
