import { createEffect, createEvent, createStore, forward } from "effector";
import { useStore } from "effector-react";
import { LoginStore, Error } from "./model.types";
import { validateEmail } from "@/shared/lib/utils";

const handleChangeEmail = createEvent<string>();
const handleChangePassword = createEvent<string>();
const handleChangeIsRemember = createEvent<boolean>();
const handleEmailError = createEvent<Error>();
const handlePasswordError = createEvent<Error>();
const handleBlurEmail = createEvent<string>();
const handleBlurPassword = createEvent<string>();

const handleCheckEmail = createEffect((email: string) => {
  if (!email.length) {
    handleEmailError("empty");
    return;
  }
  if (!validateEmail(email)) {
    handleEmailError("invalidEmail");
    return;
  }

  handleEmailError(null);
});

const handleCheckPassword = createEffect((password: string) => {
  if (!password.length) {
    handlePasswordError("empty");
    return;
  }
  if (password.length < 8) {
    handlePasswordError("length");
    return;
  }

  handlePasswordError(null);
});

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
  to: handleCheckEmail,
});
forward({
  from: handleBlurPassword,
  to: handleCheckPassword,
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
};

export { store, actions };
