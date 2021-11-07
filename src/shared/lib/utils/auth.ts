import Cookies from "js-cookie";
import Router from "next/router";

export const Auth = {
  getIsAuth: (): boolean => {
    if (
      Cookies.get("token") ||
      (typeof window !== "undefined" && sessionStorage.getItem("token"))
    ) {
      return true;
    }

    return false;
  },
  setAuth: (token: string, isRemember: boolean) => {
    if (isRemember) {
      Cookies.set("token", token);
    } else {
      sessionStorage.setItem("token", token);
    }
  },
  clear: () => {
    Cookies.remove("token");
    sessionStorage.removeItem("token");
    Router.push("/login");
  },
};
