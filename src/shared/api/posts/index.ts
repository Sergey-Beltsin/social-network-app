import { AxiosPromise } from "axios";

import { axios } from "@/shared/api";
import { postsRoutes } from "./routes";
import { Profile } from "@/shared/api/profile";

export type Post = {
  id: string;
  created: Date;
  likes: string[];
  content: string;
  profile: Profile;
  isLiked: boolean;
  likesCount: number;
};

export type GetPostsResponse = {
  message: {
    posts: Post[];
    pages: number;
  };
};

export const getPosts = async (
  page?: number,
  limit?: number,
): Promise<AxiosPromise<GetPostsResponse>> =>
  axios.get(postsRoutes.posts, {
    params: {
      page,
      limit,
    },
  });

export const createPost = async (content: string): Promise<AxiosPromise> =>
  axios.post(postsRoutes.posts, { content });

export const likePost = async (
  postId: string,
): Promise<AxiosPromise<{ message: Post }>> =>
  axios.post(postsRoutes.post(postId));
