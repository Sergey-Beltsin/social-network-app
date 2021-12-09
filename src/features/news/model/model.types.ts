import { Posts } from "@/entities/post";

export type NewsStore = {
  page: number;
  isLoading: boolean;
  pages: number;
  news: Posts;
};
