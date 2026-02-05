import { HackathonPhase } from "./hackathonState";

export function deriveHackathonPhase(
  currentDay: number,
  totalDays = 10,
): HackathonPhase {
  if (currentDay <= 2) return "early";
  if (currentDay <= 6) return "mid";
  if (currentDay <= 9) return "late";
  return "submission";
}
