import {
  createEffect,
  createEvent,
  createStore,
  forward,
  sample,
} from "effector";
import { useStore } from "effector-react";
import { FormEvent } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import { LoginStore, Error, SubmitPayload } from "./model.types";
import { validateEmail } from "@/shared/lib/utils";
import { login } from "@/shared/api";
import { useAuth } from "@/shared/lib/hooks";
import { setIsAuth } from "@/shared/lib/hooks/use-auth";

const handleChangeEmail = createEvent<string>();
const handleChangePassword = createEvent<string>();
const handleChangeIsRemember = createEvent<boolean>();
const handleEmailError = createEvent<Error>();
const handlePasswordError = createEvent<Error>();
const handleBlurEmail = createEvent<string>();
const handleBlurPassword = createEvent<string>();
const handleSubmit = createEvent<FormEvent>();

const handleCheckEmailFx = createEffect((email: string): Error => {
  if (!email.length) {
    handleEmailError("empty");
    return "empty";
  }
  if (!validateEmail(email)) {
    handleEmailError("invalidEmail");
    return "invalidEmail";
  }

  handleEmailError(null);
  return null;
});

const handleCheckPasswordFx = createEffect((password: string): Error => {
  if (!password.length) {
    handlePasswordError("empty");
    return "empty";
  }
  if (password.length < 8) {
    handlePasswordError("length");
    return "length";
  }

  handlePasswordError(null);
  return null;
});

const handleSubmitFx = createEffect(
  async ({ email, password, event }: SubmitPayload) => {
    event.preventDefault();

    if (
      !(await handleCheckEmailFx(email)) &&
      !(await handleCheckPasswordFx(password))
    ) {
      try {
        const response = await login({ email, password });

        setIsAuth(true);
        Cookies.set("token", response.data.message.access_token);

        const returningUrl = localStorage.getItem("returningUrl");

        if (returningUrl) {
          Router.push(JSON.parse(returningUrl));
        } else {
          Router.push("/");
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
);

const $login = createStore<LoginStore>({
  email: "",
  password: "",
  isRemember: false,
  errors: {
    email: null,
    password: null,
  },
})
  .on(handleChangeEmail, (state, email) => ({ ...state, email }))
  .on(handleChangePassword, (state, password) => ({ ...state, password }))
  .on(handleChangeIsRemember, (state, isRemember) => ({
    ...state,
    isRemember,
  }))
  .on(handleEmailError, (state, email) => ({
    ...state,
    errors: { ...state.errors, email },
  }))
  .on(handlePasswordError, (state, password) => ({
    ...state,
    errors: { ...state.errors, password },
  }));

forward({
  from: handleBlurEmail,
  to: handleCheckEmailFx,
});
forward({
  from: handleBlurPassword,
  to: handleCheckPasswordFx,
});
sample({
  clock: handleSubmit,
  source: $login,
  fn: (store, event) => ({
    email: store.email,
    password: store.password,
    event,
  }),
  target: handleSubmitFx,
});

const useLoginStore = (): LoginStore => useStore($login);

const store = {
  useLoginStore,
};
const actions = {
  handleChangeEmail,
  handleChangePassword,
  handleChangeIsRemember,
  handleBlurEmail,
  handleBlurPassword,
  handleSubmit,
};

export const loginModel = { store, actions };
