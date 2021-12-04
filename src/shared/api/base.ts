import axiosInstance from "axios";

export const axios = axiosInstance.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
  timeout: 5000,
});
