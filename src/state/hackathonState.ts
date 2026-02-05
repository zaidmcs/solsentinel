export type HackathonPhase = "early" | "mid" | "late" | "submission";

export interface HackathonState {
  currentDay: number;
  daysRemaining: number;
  timeRemainingMs: number;
  timeRemainingFormatted: string;
  phase: HackathonPhase;
  announcement?: string;
  hasActivePoll: boolean;
}
