export interface VideoItem {
  id: string;
  videoUrl: string;
  authorName: string;
  authorAvatar: string;
  description: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  song?: string;
}

export interface LikeState {
  [videoId: string]: {
    liked: boolean;
    count: number;
  };
}
