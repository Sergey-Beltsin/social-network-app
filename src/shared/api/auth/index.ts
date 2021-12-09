import { AxiosPromise } from "axios";
import { axios } from "@/shared/api";
import { authRoutes } from "./routes";
import { Profile } from "@/shared/api/profile";

type LoginPayload = {
  email: string;
  password: string;
};
type RegisterPayload = {
  email: string;
  password: string;
  username: string;
  name: string;
  surname: string;
};

type LoginResponse = {
  message: {
    // eslint-disable-next-line camelcase
    access_token: string;
    profile: Profile;
  };
};

export const login = async (
  payload: LoginPayload,
): Promise<AxiosPromise<LoginResponse>> =>
  axios.post(authRoutes.login, payload);

export const register = async (
  body: RegisterPayload,
): Promise<AxiosPromise<LoginResponse>> =>
  axios.post(authRoutes.register, body);
