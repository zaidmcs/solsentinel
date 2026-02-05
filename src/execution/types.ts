export interface AgentStatusApiResponse {
  hackathon: {
    currentDay: number;
    daysRemaining: number;
    timeRemainingMs: number;
    timeRemainingFormatted: string;
  };
  hasActivePoll: boolean;
  announcement?: unknown;
}
