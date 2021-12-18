import { AxiosPromise, AxiosRequestConfig } from "axios";

import { axios } from "@/shared/api";
import { usersRoutes } from "./routes";
import { FriendRequestStatus, Profile } from "@/shared/api/profile";
import { GetPostsResponse } from "@/shared/api/posts";

type GetUserResponse = {
  message: {
    id: string;
    email: string;
    profile: Profile;
  };
};

type GetUsersResponse = {
  message: Profile[];
};

export type FriendRequest = {
  id: string;
  status: FriendRequestStatus;
  creator: Profile;
  receiver: Profile;
};

export const getUsers = async (
  query?: string,
  config?: AxiosRequestConfig,
): Promise<AxiosPromise<GetUsersResponse>> =>
  axios.get(usersRoutes.users(query), config);

export const getUserById = async (
  id: string,
): Promise<AxiosPromise<GetUserResponse>> => axios.get(usersRoutes.user(id));

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

export const getUserFriendsById = async (
  id: string,
): Promise<AxiosPromise<{ message: Profile[] }>> =>
  axios.get(usersRoutes.friends(id));

export const addUserToFriends = async (
  receiverId: string,
): Promise<AxiosPromise<{ message: FriendRequest }>> =>
  axios.post(usersRoutes.friendRequests, { receiverId });

export const respondOnFriendRequestById = async (
  id: string,
  status?: FriendRequestStatus,
  config?: AxiosRequestConfig,
): Promise<AxiosPromise<{ message: FriendRequest }>> =>
  axios(usersRoutes.friendRequest(id), {
    method: "PUT",
    data: {
      status,
    },
    ...config,
  });

export const getIncomingFriendRequests = async (): Promise<
  AxiosPromise<{ message: Profile[] }>
> => axios.get(usersRoutes.incomingRequests);
