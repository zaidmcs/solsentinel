export function evaluateTimePressure(hoursRemaining: number): {
  score: number;
  reasons: string[];
} {
  const reasons: string[] = [];
  let score = 0;

  if (hoursRemaining < 72) {
    score += 0.5;
    reasons.push("Less than 72 hours remaining");
  }

  if (hoursRemaining < 24) {
    score += 0.3;
    reasons.push("Final 24 hours");
  }

  return { score, reasons };
}
