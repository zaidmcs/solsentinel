import { AgentDecision } from "./decisionTypes";
import { DecisionContext } from "./decisionContext";

export function decideNextAction(ctx: DecisionContext): AgentDecision {
  // --- Rule 1: Active poll always matters ---
  if (ctx.hackathon.hasActivePoll) {
    return {
      type: "PREPARE_POLL_RESPONSE",
      confidence: 0.95,
      reason: "Hackathon has an active poll requiring engagement",
    };
  }

  // --- Rule 2: Late phase → increase visibility ---
  if (ctx.hackathon.phase === "late") {
    return {
      type: "PREPARE_FORUM_POST",
      confidence: 0.7,
      reason: "Late hackathon phase — visibility becomes critical",
    };
  }

  // --- Rule 3: Strong forum momentum ---
  if (ctx.forum.highEngagementThreads.length >= 5) {
    return {
      type: "PREPARE_COLLAB_OUTREACH",
      confidence: 0.6,
      reason: "Multiple high-engagement forum threads detected",
      context: {
        threadCount: ctx.forum.highEngagementThreads.length,
      },
    };
  }

  // --- Default: Observe ---
  return {
    type: "MONITOR",
    confidence: 0.4,
    reason: "No high-priority triggers detected",
  };
}
