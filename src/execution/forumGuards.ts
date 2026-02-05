import { ForumPostsResponse } from "./forumTypes";

export function isForumPostsResponse(
  data: unknown,
): data is ForumPostsResponse {
  if (typeof data !== "object" || data === null) return false;

  const d = data as Record<string, unknown>;

  if (!Array.isArray(d.posts)) return false;
  if (typeof d.totalCount !== "number") return false;
  if (typeof d.hasMore !== "boolean") return false;

  return d.posts.every((item) => {
    if (typeof item !== "object" || item === null) return false;
    const p = item as Record<string, unknown>;

    return (
      typeof p.id === "number" &&
      typeof p.title === "string" &&
      Array.isArray(p.tags) &&
      typeof p.score === "number" &&
      typeof p.commentCount === "number" &&
      typeof p.createdAt === "string"
    );
  });
}
