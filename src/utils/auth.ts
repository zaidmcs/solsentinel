export function getAuthHeaders(): Record<string, string> {
  const apiKey = process.env.COLOSSEUM_API_KEY;

  if (!apiKey) {
    throw new Error("Missing COLOSSEUM_API_KEY in environment variables");
  }

  return {
    Authorization: `Bearer ${apiKey}`,
  };
}
