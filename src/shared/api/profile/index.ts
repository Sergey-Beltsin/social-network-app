import { AxiosPromise } from "axios";

import { axios } from "@/shared/api";
import { profileRoutes } from "@/shared/api/profile/routes";

export const getProfile = async (): Promise<AxiosPromise> =>
  axios.get(profileRoutes.profile);
