import { HackathonInput } from "../signals/signalInputs";

export function evaluateHackathonRisk(input: HackathonInput): {
  score: number;
  reasons: string[];
} {
  const reasons: string[] = [];
  let score = 0;

  if (input.currentDay <= 3) {
    score += 0.3;
    reasons.push("Early hackathon phase: high uncertainty");
  }

  if (input.hasActivePoll) {
    score += 0.2;
    reasons.push("Active poll indicates coordination moment");
  }

  if (input.announcementPresent) {
    score += 0.2;
    reasons.push("Announcement detected");
  }

  return { score, reasons };
}
