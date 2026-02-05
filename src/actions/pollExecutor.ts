import fetch from "node-fetch";
import { getAuthHeaders } from "../utils/auth";

export async function submitPollResponse(
  submitUrl: string,
  response: Record<string, unknown>,
): Promise<void> {
  const res = await fetch(submitUrl, {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ response }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Poll submission failed: ${text}`);
  }
}
