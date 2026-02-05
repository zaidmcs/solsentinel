import { ActivePoll } from "./poll";

export function buildPollResponse(poll: ActivePoll): Record<string, unknown> {
  // Deterministic, honest response
  if (poll.slug === "model-harness-20260204") {
    return {
      model: "gpt-5.2",
      harness: "custom",
    };
  }

  // Fallback for future polls
  return {};
}
