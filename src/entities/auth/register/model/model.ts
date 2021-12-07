import { createEffect, createEvent, createStore, sample } from "effector";
import { useStore } from "effector-react";
import Router from "next/router";

import { RegisterStore, SubmitPayload } from "./model.types";
import { login, register } from "@/shared/api/auth";
import { actions, Auth } from "@/entities/profile";

const handleChangeIsLoading = createEvent<boolean>();
const handleChangeError = createEvent<string>();
const handleSubmit = createEvent<SubmitPayload>();
const handleReset = createEvent<void>();

const handleSubmitFx = createEffect(async (payload: SubmitPayload) => {
  const { setProfile } = actions;

  try {
    handleChangeIsLoading(true);

    await register({
      email: payload.email,
      name: payload.name,
      surname: payload.surname,
      username: payload.username,
      password: payload.password,
    });

    const {
      data: { message },
    } = await login({
      email: payload.email,
      password: payload.password,
    });

    Auth.setAuth(message.access_token, true);
    setProfile(message.user);

    const returningUrl = localStorage.getItem("returningUrl");

    if (returningUrl) {
      Router.push(JSON.parse(returningUrl));
      localStorage.removeItem("returningUrl");
    } else {
      Router.push("/profile");
    }
  } catch (e) {
    console.log(e);

    const { message } = e.response.data;

    if (message === "alreadyExists") {
      handleChangeError(e.response.data.message);
    } else {
      // handleChangeManyErrors(e.response.data.message);
    }
  } finally {
    handleChangeIsLoading(false);
  }
});

const $register = createStore<RegisterStore>({
  isLoading: false,
  error: "",
})
  .on(handleChangeIsLoading, (store, isLoading) => ({ ...store, isLoading }))
  .on(handleChangeError, (store, error) => ({
    ...store,
    error,
  }))
  .reset(handleReset);

sample({
  clock: handleSubmit,
  source: $register,
  fn: (store, payload) => payload,
  target: handleSubmitFx,
});

const useRegisterStore = (): RegisterStore => useStore($register);

export const registerModel = {
  events: {
    handleSubmit,
    handleChangeError,
    handleReset,
  },
  store: { useRegisterStore },
};
