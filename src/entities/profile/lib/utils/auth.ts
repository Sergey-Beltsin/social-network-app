import Cookies from "js-cookie";
import Router from "next/router";

import { actions } from "@/entities/profile";

const { resetProfile } = actions;

export const Auth = {
  getIsAuth: (): boolean =>
    !!(
      Cookies.get("token") ||
      (typeof window !== "undefined" && sessionStorage.getItem("token"))
    ),
  setAuth: (token: string, isRemember: boolean) => {
    if (isRemember) {
      Cookies.set("token", token, {
        SameSite: "Lax",
      });
    } else {
      sessionStorage.setItem("token", token);
    }
  },
  clear: () => {
    resetProfile();
    Cookies.remove("token");
    sessionStorage.removeItem("token");
    Router.push("/login");
  },
};
