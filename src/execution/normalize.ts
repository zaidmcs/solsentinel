export function normalizeAnnouncement(input: unknown): string | undefined {
  if (!input) return undefined;

  if (typeof input === "string") return input;

  if (typeof input === "object") {
    try {
      return JSON.stringify(input, null, 2);
    } catch {
      return "[Unserializable announcement]";
    }
  }

  return String(input);
}
