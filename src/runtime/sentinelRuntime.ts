import { SentinelSignal } from "../signals/sentinelSignal";
import { HackathonInput, ForumInput, TimeInput } from "../signals/signalInputs";

export function runSolSentinel(
  hackathon: HackathonInput,
  forum: ForumInput,
  time: TimeInput,
): SentinelSignal {
  const reasons: string[] = [];

  // --- MODE ---
  const mode =
    hackathon.hasActivePoll || forum.highEngagementThreads > 10
      ? "ACT"
      : "READ_ONLY";

  if (hackathon.hasActivePoll) {
    reasons.push("Active poll indicates coordination moment");
  }

  // --- RISK ---
  let risk: "RISK_ON" | "RISK_OFF" | "NEUTRAL" = "NEUTRAL";

  if (forum.securityMentions > 3) {
    risk = "RISK_OFF";
    reasons.push("Elevated security discussion across forum");
  } else if (forum.highEngagementThreads > 15) {
    risk = "RISK_ON";
    reasons.push("Unusually high engagement across forum");
  }

  // --- EXECUTION ---
  const execution =
    risk === "RISK_OFF" || time.hoursRemaining < 12
      ? "WAIT"
      : "SAFE_TO_EXECUTE";

  if (execution === "WAIT") {
    reasons.push("Execution risk outweighs coordination benefit");
  }

  // --- CONFIDENCE (0 → 1) ---
  let confidence = 0.25;

  if (hackathon.hasActivePoll) confidence += 0.15;
  if (forum.highEngagementThreads > 10) confidence += 0.15;
  if (forum.securityMentions > 3) confidence -= 0.1;
  if (time.hoursRemaining < 24) confidence += 0.05;

  confidence = Math.max(0, Math.min(1, confidence));

  // --- FINAL SIGNAL ---
  const signal: SentinelSignal = {
    version: "1.0",
    timestamp: new Date().toISOString(),

    mode,
    risk,
    execution,
    confidence,
    reasons,
  };

  return signal;
}
