import { fetchHackathonStatus } from "../execution/status";
import { fetchHotForumPosts } from "../execution/forum";
import { analyzeForumPosts } from "../state/forumAnalyzer";
import { getSolSentinelSignal } from "../runtime/getSolSentinelSignal";
import { emitSentinelSignal } from "../runtime/emitSignal";

export async function runSolSentinelCLI() {
  const status = await fetchHackathonStatus();
  const posts = await fetchHotForumPosts(20);
  const forum = analyzeForumPosts(posts);

  const signal = getSolSentinelSignal(
    {
      currentDay: status.currentDay,
      daysRemaining: status.daysRemaining,
      hasActivePoll: status.hasActivePoll,
      announcementPresent: Boolean(status.announcement),
    },
    {
      highEngagementThreads: forum.highEngagementThreads.length,
      securityMentions: forum.tagFrequency["security"] ?? 0,
      totalThreads: forum.totalThreadsAnalyzed,
    },
    {
      hoursRemaining: status.timeRemainingMs / (1000 * 60 * 60),
    },
  );

  emitSentinelSignal(signal);
}
