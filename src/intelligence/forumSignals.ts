import { ForumInput } from "../signals/signalInputs";

export function evaluateForumRisk(input: ForumInput): {
  score: number;
  reasons: string[];
} {
  const reasons: string[] = [];
  let score = 0;

  if (input.securityMentions / input.totalThreads > 0.25) {
    score += 0.4;
    reasons.push("High security-focused discussion");
  }

  if (input.highEngagementThreads > input.totalThreads * 0.8) {
    score += 0.3;
    reasons.push("Unusually high engagement across forum");
  }

  return { score, reasons };
}
