export interface ForumThreadSignal {
  postId: number;
  title: string;
  tags: string[];
  score: number;
  commentCount: number;
  createdAt: number;
}

export interface ForumState {
  totalThreadsAnalyzed: number;
  highEngagementThreads: ForumThreadSignal[];
  tagFrequency: Record<string, number>;
}
