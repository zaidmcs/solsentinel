import { AgentStatusApiResponse } from "./types";

export function isAgentStatusApiResponse(
  data: unknown,
): data is AgentStatusApiResponse {
  if (typeof data !== "object" || data === null) return false;

  const d = data as Record<string, unknown>;
  const h = d.hackathon as Record<string, unknown> | undefined;

  if (!h) return false;

  return (
    typeof h.currentDay === "number" &&
    typeof h.daysRemaining === "number" &&
    typeof h.timeRemainingMs === "number" &&
    typeof h.timeRemainingFormatted === "string" &&
    typeof d.hasActivePoll === "boolean"
  );
}
