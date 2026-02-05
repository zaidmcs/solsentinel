import fetch from "node-fetch";
import { ENV } from "../config/env";
import { COLOSSEUM_API_BASE } from "../config/constants";
import { HackathonState } from "../state/hackathonState";
import { deriveHackathonPhase } from "../state/derivePhase";
import { isAgentStatusApiResponse } from "./guards";
import { normalizeAnnouncement } from "./normalize";

export interface HackathonStatus {
  currentDay: number;
  daysRemaining: number;
  timeRemainingMs: number;
  hasActivePoll: boolean;
  announcement?: unknown;
}
/**
 * Fetches and normalizes the agent's hackathon status.
 * IMPORTANT: This function must return a STRUCTURED OBJECT,
 * not a string, for downstream signal engines.
 */
export async function fetchHackathonStatus(): Promise<HackathonState> {
  const response = await fetch(`${COLOSSEUM_API_BASE}/agents/status`, {
    headers: {
      Authorization: `Bearer ${ENV.COLOSSEUM_API_KEY}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Failed to fetch agent status (${response.status}): ${text}`,
    );
  }

  const raw: unknown = await response.json();

  if (!isAgentStatusApiResponse(raw)) {
    console.error("❌ Raw agent status response:", raw);
    throw new Error("Invalid agent status API response shape");
  }

  const phase = deriveHackathonPhase(raw.hackathon.currentDay);

  const state: HackathonState = {
    currentDay: raw.hackathon.currentDay,
    daysRemaining: raw.hackathon.daysRemaining,
    timeRemainingMs: raw.hackathon.timeRemainingMs,
    timeRemainingFormatted: raw.hackathon.timeRemainingFormatted,
    hasActivePoll: raw.hasActivePoll,
    announcement: normalizeAnnouncement(raw.announcement),
    phase,
  };

  return state;
}
