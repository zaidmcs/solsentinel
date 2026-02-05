import fetch from "node-fetch";
import { COLOSSEUM_API_BASE } from "../config/constants";
import { getAuthHeaders } from "../utils/auth";

/**
 * This reflects the REAL poll object returned by Colosseum
 */
export interface ActivePoll {
  id: number;
  slug: string;
  title: string;
  prompt: string;
  responseSchema: Record<string, unknown>;
  submitUrl: string;
}

/**
 * Runtime guard for the active poll response
 */
function isActivePollResponse(data: unknown): data is { poll: ActivePoll } {
  if (typeof data !== "object" || data === null) return false;

  const d = data as Record<string, unknown>;
  if (typeof d.poll !== "object" || d.poll === null) return false;

  const p = d.poll as Record<string, unknown>;

  return (
    typeof p.id === "number" &&
    typeof p.slug === "string" &&
    typeof p.title === "string" &&
    typeof p.prompt === "string" &&
    typeof p.submitUrl === "string"
  );
}

export async function fetchActivePoll(): Promise<ActivePoll> {
  const res = await fetch(`${COLOSSEUM_API_BASE}/agents/polls/active`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch poll (${res.status})`);
  }

  const data: unknown = await res.json();

  if (!isActivePollResponse(data)) {
    console.error("❌ Raw poll response:", data);
    throw new Error("Invalid active poll response shape");
  }

  return data.poll;
}
