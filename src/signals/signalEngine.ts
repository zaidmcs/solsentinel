import { SentinelSignal } from "./signalTypes";
import { SIGNAL_WEIGHTS } from "./signalWeights";
import { evaluateHackathonRisk } from "../intelligence/hackathonSignals";
import { evaluateForumRisk } from "../intelligence/forumSignals";
import { evaluateTimePressure } from "../intelligence/timeSignals";
import { HackathonInput, ForumInput, TimeInput } from "./signalInputs";

export function generateSentinelSignal(
  hackathon: HackathonInput,
  forum: ForumInput,
  time: TimeInput,
): SentinelSignal {
  const reasons: string[] = [];

  const h = evaluateHackathonRisk(hackathon);
  const f = evaluateForumRisk(forum);
  const t = evaluateTimePressure(time.hoursRemaining);

  reasons.push(...h.reasons, ...f.reasons, ...t.reasons);

  const riskScore =
    h.score * SIGNAL_WEIGHTS.timePressure +
    f.score * SIGNAL_WEIGHTS.forumRisk +
    t.score * SIGNAL_WEIGHTS.coordinationNoise;

  const risk =
    riskScore > 0.7 ? "RISK_OFF" : riskScore > 0.4 ? "NEUTRAL" : "RISK_ON";

  const execution = risk === "RISK_ON" ? "SAFE_TO_EXECUTE" : "WAIT";
  const mode = risk === "RISK_ON" ? "ACT" : "READ_ONLY";

  return {
    mode,
    risk,
    execution,
    confidence: Math.min(1, riskScore),
    reasons,
  };
}
