import fetch from "node-fetch";
import { COLOSSEUM_API_BASE } from "../config/constants";
import { isForumPostsResponse } from "./forumGuards";
import { ForumPostApi } from "./forumTypes";

export async function fetchHotForumPosts(limit = 20): Promise<ForumPostApi[]> {
  const response = await fetch(
    `${COLOSSEUM_API_BASE}/forum/posts?sort=hot&limit=${limit}`,
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Failed to fetch forum posts (${response.status}): ${text}`,
    );
  }

  const raw: unknown = await response.json();

  if (!isForumPostsResponse(raw)) {
    console.error("❌ Raw forum response:", raw);
    throw new Error("Invalid forum posts response shape");
  }

  // ✅ GUARANTEED RETURN
  return raw.posts;
}
