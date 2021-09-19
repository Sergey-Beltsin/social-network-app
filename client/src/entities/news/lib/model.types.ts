export interface INews {
  title: string;
  description: string;
  created: Date;
  authorName: string;
  authorPhoto: string;
  likesCount: number;
  commentsCount: number;
  id: string;
}

export type News = Array<INews>;
