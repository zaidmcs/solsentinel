import { SentinelSignal } from "../signals/sentinelSignal";
import { runSolSentinel } from "./sentinelRuntime";
import { HackathonInput, ForumInput, TimeInput } from "../signals/signalInputs";

export function getSolSentinelSignal(
  hackathon: HackathonInput,
  forum: ForumInput,
  time: TimeInput,
): SentinelSignal {
  return runSolSentinel(hackathon, forum, time);
}
