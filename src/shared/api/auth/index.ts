import { AxiosPromise } from "axios";
import { axios } from "@/shared/api/base";
import { authRoutes } from "@/shared/api/auth/routes";

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

export const login = (payload: LoginPayload): AxiosPromise =>
  axios.post(authRoutes.login, payload);

export const register = (body: RegisterPayload): AxiosPromise =>
  axios.post(authRoutes.register, body);
