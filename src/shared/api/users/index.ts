import { AxiosPromise, AxiosRequestConfig } from "axios";

import { axios } from "@/shared/api";
import { usersRoutes } from "./routes";

export const getUsers = async (
  query?: string,
  config?: AxiosRequestConfig,
): Promise<AxiosPromise> =>
  axios.get(
    typeof usersRoutes.users === "function"
      ? usersRoutes.users(query || "")
      : "",
    config,
  );
