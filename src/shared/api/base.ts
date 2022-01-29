/* eslint-disable no-param-reassign */
import axiosInstance from "axios";
import Cookies from "js-cookie";
import Router from "next/router";

export const DEFAULT_BASE_URL: string = "https://social.belts.dev";

export const axios = axiosInstance.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL || DEFAULT_BASE_URL}/api`,
  timeout: 5000,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
});

axios.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${
      Cookies.get("token") || sessionStorage.getItem("token")
    }`;
  }

  return config;
});

axios.interceptors.response.use(
  (res) => Promise.resolve(res),
  (error) => {
    if (+error.response.status === 401) {
      if (typeof window !== "undefined") {
        Cookies.remove("token");
        Router.push("/login");
      }
    }

    return Promise.reject(error);
  },
);
