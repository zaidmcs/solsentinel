import { ForumPostApi } from "../execution/forumTypes";
import { ForumState, ForumThreadSignal } from "./forumState";

export function analyzeForumPosts(posts: ForumPostApi[]): ForumState {
  const tagFrequency: Record<string, number> = {};
  const highEngagementThreads: ForumThreadSignal[] = [];

  for (const post of posts) {
    for (const tag of post.tags) {
      tagFrequency[tag] = (tagFrequency[tag] ?? 0) + 1;
    }

    if (post.score >= 5 || post.commentCount >= 5) {
      highEngagementThreads.push({
        postId: post.id,
        title: post.title,
        tags: post.tags,
        score: post.score,
        commentCount: post.commentCount,
        createdAt: Date.parse(post.createdAt),
      });
    }
  }

  // ✅ REQUIRED RETURN
  return {
    totalThreadsAnalyzed: posts.length,
    highEngagementThreads,
    tagFrequency,
  };
}
