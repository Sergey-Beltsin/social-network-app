import { AxiosPromise, AxiosRequestConfig } from "axios";

import { axios } from "@/shared/api";
import { usersRoutes } from "./routes";
import { Profile } from "@/shared/api/profile";
import { GetPostsResponse, Post } from "@/shared/api/posts";

type UserResponse = {
  message: {
    id: string;
    email: string;
    profile: Profile;
  };
};

export const getUsers = async (
  query?: string,
  config?: AxiosRequestConfig,
): Promise<AxiosPromise> => axios.get(usersRoutes.users(query), config);

export const getUserById = async (
  id: string,
): Promise<AxiosPromise<UserResponse>> => axios.get(usersRoutes.user(id));

export const getPostsByUserId = async (
  id: string,
  page?: number,
  limit?: number,
): Promise<AxiosPromise<GetPostsResponse>> =>
  axios.get(usersRoutes.posts(id), {
    params: {
      page,
      limit,
    },
  });
