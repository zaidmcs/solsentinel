export interface ForumPostApi {
  id: number;
  title: string;
  body: string;
  tags: string[];
  score: number;
  commentCount: number;
  createdAt: string;
}

export interface ForumPostsResponse {
  posts: ForumPostApi[];
  totalCount: number;
  hasMore: boolean;
}
