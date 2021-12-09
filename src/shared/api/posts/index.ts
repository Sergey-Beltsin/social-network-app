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
};

type GetPostsResponse = {
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
