import { ActivePoll } from "./poll";

export function buildPollResponse(_: ActivePoll): Record<string, unknown> {
  return {
    model: "gpt-5.2",
    harness: "custom",
    oversight: "occasional-checkins",
    details:
      "SolSentinel operates autonomously to emit read-only decision-confidence signals. Humans periodically review outputs and thresholds, but signals are not blocked or manually approved.",
  };
}
