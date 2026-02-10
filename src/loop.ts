import { fetchHackathonStatus } from "./execution/status";
import { fetchHotForumPosts } from "./execution/forum";
import { analyzeForumPosts } from "./state/forumAnalyzer";
import { decideNextAction } from "./decision/decisionEngine";
import { DecisionContext } from "./decision/decisionContext";
import { executeDecision } from "./actions/actionExecutor";
import { runSolSentinel } from "./runtime/sentinelRuntime";
import { HackathonState } from "./state/hackathonState";
import { emitSentinelSignal } from "./runtime/emitSignal";
import { getSolSentinelSignal } from "./runtime/getSolSentinelSignal";
import { writeSignalToSolana } from "./solana/writeSignalViaAgentWallet";

export async function runAgentLoop(): Promise<void> {
  console.log("🔁 Agent loop started");

  // --- Hackathon awareness (Phase 2) ---
  const status: HackathonState = await fetchHackathonStatus();

  console.log("📅 Hackathon Status");
  console.log(`   Day: ${status.currentDay}`);
  console.log(`   Phase: ${status.phase}`);
  console.log(`   Days Remaining: ${status.daysRemaining}`);
  console.log(`   Time Left: ${status.timeRemainingFormatted}`);

  if (status.announcement) {
    console.log("📢 Announcement:");
    console.log(status.announcement);
  }

  if (status.hasActivePoll) {
    console.log("🗳️ Active poll detected");
  }

  // --- Forum intelligence (Phase 3) ---
  const forumPosts = await fetchHotForumPosts(20);
  const forumState = analyzeForumPosts(forumPosts);

  console.log("🧠 Forum Intelligence");
  console.log(`   Threads analyzed: ${forumState.totalThreadsAnalyzed}`);

  console.log("   Tag frequency:");
  for (const [tag, count] of Object.entries(forumState.tagFrequency)) {
    console.log(`     #${tag}: ${count}`);
  }

  console.log(
    `   High engagement threads: ${forumState.highEngagementThreads.length}`,
  );

  // --- Decision engine (Phase 4) ---
  const decisionContext: DecisionContext = {
    hackathon: status,
    forum: forumState,
  };

  const decision = decideNextAction(decisionContext);

  console.log("🤖 Agent Decision");
  console.log(`   Type: ${decision.type}`);
  console.log(`   Confidence: ${decision.confidence}`);
  console.log(`   Reason: ${decision.reason}`);

  if (decision.context) {
    console.log("   Context:");
    console.log(JSON.stringify(decision.context, null, 2));
  }

  const actionResult = await executeDecision(decision);

  console.log("⚙️ Action Execution");
  console.log(`   Action: ${actionResult.action}`);
  console.log(`   Success: ${actionResult.success}`);
  console.log(`   Message: ${actionResult.message}`);

  // --- SolSentinel Signal Engine (Phase 7 + 8) ---
  runSolSentinel(
    {
      currentDay: status.currentDay,
      daysRemaining: status.daysRemaining,
      hasActivePoll: status.hasActivePoll,
      announcementPresent: Boolean(status.announcement),
    },
    {
      highEngagementThreads: forumState.highEngagementThreads.length,
      securityMentions: forumState.tagFrequency["security"] ?? 0,
      totalThreads: forumState.totalThreadsAnalyzed,
    },
    {
      hoursRemaining: status.timeRemainingMs / (1000 * 60 * 60),
    },
  );

  console.log("✅ Agent loop completed");

  const sentinelSignal = getSolSentinelSignal(
    {
      currentDay: status.currentDay,
      daysRemaining: status.daysRemaining,
      hasActivePoll: status.hasActivePoll,
      announcementPresent: Boolean(status.announcement),
    },
    {
      highEngagementThreads: forumState.highEngagementThreads.length,
      securityMentions: forumState.tagFrequency["security"] ?? 0,
      totalThreads: forumState.totalThreadsAnalyzed,
    },
    {
      hoursRemaining: status.timeRemainingMs / (1000 * 60 * 60),
    },
  );

  const onchain = await writeSignalToSolana(sentinelSignal);

  if (onchain.committed) {
    console.log("⛓️ Solana Proof Committed");
    console.log(`   Tx: ${onchain.txSig}`);
  } else {
    console.log("⛓️ Solana Proof Prepared");
    console.log("   Status: non-blocking");
  }

  emitSentinelSignal(sentinelSignal);
}
