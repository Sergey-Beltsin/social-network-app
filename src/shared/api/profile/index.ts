import { AxiosPromise } from "axios";

import { axios } from "@/shared/api";
import { profileRoutes } from "@/shared/api/profile/routes";

export type Profile = {
  id: string;
  created: Date;
  bio: string;
  username: string;
  name: string;
  surname: string;
};

export const getProfile = async (): Promise<AxiosPromise> =>
  axios.get(profileRoutes.profile);
