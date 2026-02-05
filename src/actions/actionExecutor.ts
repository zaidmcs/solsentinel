import { AgentDecision } from "../decision/decisionTypes";
import { ActionResult } from "./actionTypes";
import { fetchActivePoll } from "./poll";
import { buildPollResponse } from "./pollStrategy";
import { submitPollResponse } from "./pollExecutor";

let pollResponded = false;

export async function executeDecision(
  decision: AgentDecision,
): Promise<ActionResult> {
  if (decision.type === "PREPARE_POLL_RESPONSE") {
    if (pollResponded) {
      return {
        action: "NO_OP",
        success: true,
        message: "Poll already responded to",
      };
    }

    const poll = await fetchActivePoll();
    const responsePayload = buildPollResponse(poll);

    await submitPollResponse(poll.submitUrl, responsePayload);
    pollResponded = true;

    return {
      action: "RESPOND_TO_POLL",
      success: true,
      message: `Responded to poll: "${poll.title}"`,
    };
  }

  return {
    action: "NO_OP",
    success: true,
    message: "No executable action",
  };
}
