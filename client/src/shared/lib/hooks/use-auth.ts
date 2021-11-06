import { createEvent, createStore, Event } from "effector";
import { useStore } from "effector-react";
import { useEffect } from "react";
import Cookies from "js-cookie";

type AuthResponse = {
  isAuth: boolean;
};

export const setIsAuth = createEvent<boolean>();

const $auth = createStore<boolean>(false).on(setIsAuth, (_, isAuth) => isAuth);

export const useAuth = (): AuthResponse => {
  useEffect(() => {
    if (Cookies.get("token")) {
      setIsAuth(true);
    }
  }, []);

  return {
    isAuth: useStore($auth),
  };
};
