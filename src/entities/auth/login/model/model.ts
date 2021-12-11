import { createEffect, createEvent, createStore, sample } from "effector";
import { useStore } from "effector-react";
import Router from "next/router";

import { LoginFormType, LoginStore, SubmitPayload } from "./model.types";
import { login } from "@/shared/api/auth";
import { Auth, actions as profileActions } from "@/entities/profile";

const handleChangeIsRemember = createEvent<boolean>();
const handleChangeIsLoading = createEvent<boolean>();
const handleChangeError = createEvent<string>();
const handleSubmit = createEvent<LoginFormType>();
const handleReset = createEvent<void>();

const handleSubmitFx = createEffect(
  async ({ email, password, isRemember }: SubmitPayload) => {
    const { setProfile } = profileActions;

    try {
      handleChangeIsLoading(true);

      const {
        data: { message },
      } = await login({ email, password });

      Auth.setAuth(message.access_token, isRemember);
      setProfile(message.profile);

      const returningUrl = localStorage.getItem("returningUrl");

      if (returningUrl) {
        Router.push(JSON.parse(returningUrl));
        localStorage.removeItem("returningUrl");
      } else {
        Router.push(message.profile.username);
      }
    } catch (e) {
      console.log(e);

      if (e.response.data.message === "incorrectData") {
        handleChangeError(e.response.data.message);
      }
    } finally {
      handleChangeIsLoading(false);
    }
  },
);

const $login = createStore<LoginStore>({
  isRemember: true,
  isLoading: false,
  error: "",
})
  .on(handleChangeIsRemember, (store, isRemember) => ({
    ...store,
    isRemember,
  }))
  .on(handleChangeIsLoading, (store, isLoading) => ({ ...store, isLoading }))
  .on(handleChangeError, (store, error) => ({ ...store, error }))
  .reset(handleReset);

sample({
  clock: handleSubmit,
  source: $login,
  fn: (store, data) => ({
    email: data.email,
    password: data.password,
    isRemember: store.isRemember,
  }),
  target: handleSubmitFx,
});

const useLoginStore = (): LoginStore => useStore($login);

const store = {
  useLoginStore,
};
const actions = {
  handleChangeIsRemember,
  handleSubmit,
  handleChangeError,
  handleReset,
};

export const loginModel = { store, actions };
