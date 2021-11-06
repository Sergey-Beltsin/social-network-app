import { createEffect, createEvent, createStore, sample } from "effector";
import { useStore } from "effector-react";
import { FormEvent } from "react";
import { RegisterStore, SubmitPayload } from "./model.types";
import { register } from "@/shared/api";

const handleChangeField = createEvent<{ field: string; value: string }>();
const handleChangeError = createEvent<{ field: string; value: Error }>();
const handleSubmit = createEvent<FormEvent>();

const handleSubmitFx = createEffect(async (payload: SubmitPayload) => {
  payload.event.preventDefault();

  try {
    const response = await register({
      email: payload.email,
      name: payload.name,
      surname: payload.surname,
      username: payload.username,
      password: payload.password,
    });
    console.log(response.data);
  } catch (e) {
    console.log(e);
  }
});

const $register = createStore<RegisterStore>({
  email: "",
  password: "",
  username: "",
  name: "",
  surname: "",
  errors: {
    email: null,
    password: null,
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
  fn: (store, event) => ({
    email: store.email,
    name: store.name,
    surname: store.surname,
    username: store.username,
    password: store.password,
    event,
  }),
  target: handleSubmitFx,
});

const useRegisterStore = (): RegisterStore => useStore($register);

const events = {
  handleChangeField,
  handleSubmit,
};
const store = {
  useRegisterStore,
};

export const registerModel = { events, store };
