import { AxiosPromise } from "axios";

import { axios } from "@/shared/api";
import { profileRoutes } from "@/shared/api/profile/routes";

export type FriendRequestStatus =
  | "accepted"
  | "declined"
  | "waiting-for-response"
  | "not-sent"
  | "sent";

export type FriendRequest = {
  status: FriendRequestStatus;
  id: string;
  isSentNow?: boolean;
};

export type Profile = {
  id: string;
  created: Date;
  bio: string;
  username: string;
  name: string;
  surname: string;
  friendRequest?: FriendRequest;
};

export const getProfile = async (): Promise<AxiosPromise> =>
  axios.get(profileRoutes.profile);
