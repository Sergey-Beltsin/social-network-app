import {
  createEffect,
  createEvent,
  createStore,
  forward,
  sample,
} from "effector";
import { useStore } from "effector-react";
import { FormEvent } from "react";
import Router from "next/router";
import {
  LoginStore,
  Error,
  SubmitPayload,
  LoginStoreField,
} from "./model.types";
import { validateEmail } from "@/shared/lib/utils";
import { login } from "@/shared/api/auth";
import { Auth, actions as profileActions } from "@/entities/profile";

const handleChangeValue =
  createEvent<{ field: LoginStoreField; value: string }>();
const handleChangeIsRemember = createEvent<boolean>();
const handleChangeError =
  createEvent<{ field: LoginStoreField; value: Error }>();
const handleChangeManyErrors =
  createEvent<{ field: LoginStoreField; value: Error }[]>();
const handleBlur = createEvent<{ field: LoginStoreField; value: string }>();
const handleSubmit = createEvent<FormEvent>();

const handleCheckValue = (field: LoginStoreField, value: string): Error => {
  if (!value.length) {
    return "empty";
  }
  if (field === "email" && !validateEmail(value)) {
    return "invalidEmail";
  }

  return null;
};
const handleChangeFx = createEffect(
  ({ field, value }: { field: LoginStoreField; value: string }): Error => {
    const error = handleCheckValue(field, value);

    handleChangeError({ field, value: error });
    return error;
  },
);

const handleCheckValueErrorFx = createEffect(
  ({
    field,
    value,
    error,
  }: {
    field: LoginStoreField;
    value: string;
    error: Error;
  }) => {
    const currentError = handleCheckValue(field, value);

    if (error && currentError !== error) {
      handleChangeError({ field, value: currentError });
    }
  },
);

const handleSubmitFx = createEffect(
  async ({ email, password, isRemember }: SubmitPayload) => {
    if (
      !(await handleChangeFx({ field: "email", value: email })) &&
      !(await handleChangeFx({ field: "password", value: password }))
    ) {
      const { setProfile } = profileActions;

      try {
        const {
          data: { message },
        } = await login({ email, password });

        Auth.setAuth(message.access_token, isRemember);
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

        if (e.response.data.message === "incorrectData") {
          handleChangeManyErrors([
            {
              field: "email",
              value: "incorrectData",
            },
            {
              field: "password",
              value: "incorrectData",
            },
          ]);
        }
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
  .on(handleChangeValue, (state, { field, value }) => ({
    ...state,
    [field]: value,
  }))
  .on(handleChangeIsRemember, (state, isRemember) => ({
    ...state,
    isRemember,
  }))
  .on(handleChangeError, (state, { field, value }) => ({
    ...state,
    errors: { ...state.errors, [field]: value },
  }))
  .on(handleChangeManyErrors, (store, errors) => {
    const newStore = { ...store };

    errors.forEach((item) => {
      newStore.errors[item.field] = item.value;
    });

    return newStore;
  });

forward({
  from: handleBlur,
  to: handleChangeFx,
});
sample({
  clock: handleSubmit,
  source: $login,
  fn: (store) => ({
    email: store.email,
    password: store.password,
    isRemember: store.isRemember,
  }),
  target: handleSubmitFx,
});
sample({
  clock: handleChangeValue,
  source: $login,
  fn: (store, { field, value }) => ({
    field,
    value,
    error: store.errors[field],
  }),
  target: handleCheckValueErrorFx,
});

handleSubmit.watch((event) => event.preventDefault());

const useLoginStore = (): LoginStore => useStore($login);

const store = {
  useLoginStore,
};
const actions = {
  handleChangeValue,
  handleChangeIsRemember,
  handleBlur,
  handleSubmit,
};

export const loginModel = { store, actions };
