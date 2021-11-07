import { createEffect, createEvent, createStore, sample } from "effector";
import { useStore } from "effector-react";
import { FormEvent } from "react";
import Router from "next/router";
import {
  Error,
  RegisterStore,
  RegisterStoreField,
  SubmitPayload,
} from "./model.types";
import { login, register } from "@/shared/api";
import { Auth, validateEmail } from "@/shared/lib/utils";

const validateValue = (
  field: RegisterStoreField,
  value: string,
  password?: string,
): Error => {
  if (!value) {
    return "empty";
  }
  if (field === "email" && !validateEmail(value)) {
    return "invalidEmail";
  }
  if (field === "repeatedPassword" && value !== password) {
    return "passwordMismatch";
  }

  return null;
};

const handleChangeField =
  createEvent<{ field: RegisterStoreField; value: string }>();
const handleChangeError =
  createEvent<{ field: RegisterStoreField; value: Error }>();
const handleBlur = createEvent<{ field: RegisterStoreField; value: string }>();
const handleSubmit = createEvent<FormEvent>();

const handleSubmitFx = createEffect(async (payload: SubmitPayload) => {
  try {
    await register({
      email: payload.email,
      name: payload.name,
      surname: payload.surname,
      username: payload.username,
      password: payload.password,
    });

    const response = await login({
      email: payload.email,
      password: payload.password,
    });

    Auth.setAuth(response.data.message.access_token, true);

    const returningUrl = localStorage.getItem("returningUrl");

    if (returningUrl) {
      Router.push(JSON.parse(returningUrl));
      localStorage.removeItem("returningUrl");
    } else {
      Router.push("/profile");
    }
  } catch (e) {
    console.log(e);
  }
});

const handleValidateValuesFx = createEffect(
  ({
    field,
    value,
    error,
    password,
  }: {
    field: RegisterStoreField;
    value: string;
    error: Error;
    password: string;
  }) => {
    const currentError = validateValue(field, value, password);

    if (error && currentError !== error) {
      handleChangeError({ field, value: currentError });
    }
  },
);

const handleBlurFx = createEffect(
  ({
    field,
    value,
    password,
  }: {
    field: RegisterStoreField;
    value: string;
    password: string;
  }) => {
    handleChangeError({ field, value: validateValue(field, value, password) });
  },
);

const $register = createStore<RegisterStore>({
  email: "",
  password: "",
  repeatedPassword: "",
  username: "",
  name: "",
  surname: "",
  errors: {
    email: null,
    password: null,
    repeatedPassword: null,
    username: null,
    name: null,
    surname: null,
  },
})
  .on(handleChangeField, (store, { field, value }) => ({
    ...store,
    [field]: value,
  }))
  .on(handleChangeError, (store, { field, value }) => ({
    ...store,
    errors: { ...store.errors, [field]: value },
  }));

sample({
  clock: handleSubmit,
  source: $register,
  fn: (store) => ({
    email: store.email,
    name: store.name,
    surname: store.surname,
    username: store.username,
    password: store.password,
  }),
  target: handleSubmitFx,
});
sample({
  clock: handleChangeField,
  source: $register,
  fn: (store, { field, value }) => ({
    value,
    field,
    password: store.password,
    error: store.errors[field],
  }),
  target: handleValidateValuesFx,
});
sample({
  clock: handleBlur,
  source: $register,
  fn: (store, { field, value }) => ({
    field,
    value,
    password: store.password,
  }),
  target: handleBlurFx,
});

handleSubmit.watch((event) => event.preventDefault());

const useRegisterStore = (): RegisterStore => useStore($register);

export const registerModel = {
  events: {
    handleChangeField,
    handleSubmit,
    handleBlur,
  },
  store: { useRegisterStore },
};
