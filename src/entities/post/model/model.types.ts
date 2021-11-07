export interface IPost {
  title: string;
  description: string;
  created: Date;
  authorName: string;
  authorPhoto: string;
  isLiked: boolean;
  likesCount: number;
  commentsCount: number;
  id: string;
}

export type Posts = Array<IPost>;
